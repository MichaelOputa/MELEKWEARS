import { useEffect, useState, type FormEvent } from 'react';
import { Eye, EyeOff, ImagePlus, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react';
import Img from '@/components/Img';
import { formatPrice } from '@/lib/format';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/StoreContext';
import type { Collection, Product, ProductCategory, Size } from '@/types';

const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const collections: Collection[] = ['Riviera', 'Melek Luxe Collections', 'Atelier', 'Melek Essentials', 'Female Collection'];
const categories: ProductCategory[] = ['Polos', 'Tops', 'Sets', 'Shorts'];

function newProduct(): Product {
	return {
		id: crypto.randomUUID(),
		name: '',
		collection: 'Female Collection',
		category: 'Sets',
		price: 0,
		priceUSD: 0,
		description: '',
		colors: [],
		sizes: [],
		images: [],
	};
}

function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

export default function AdminPage() {
	const { products, saveProduct, deleteProduct } = useStore();
	const [checking, setChecking] = useState(Boolean(supabase));
	const [signedIn, setSignedIn] = useState(false);
	const [authorized, setAuthorized] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [draft, setDraft] = useState<Product>(newProduct);
	const [files, setFiles] = useState<File[]>([]);
	const [busy, setBusy] = useState(false);
	const [notice, setNotice] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const client = supabase;
		if (!client) {
			setChecking(false);
			return;
		}

		let active = true;
		const checkOwner = async (userId: string) => {
			const { data, error: accessError } = await client
				.from('store_admins')
				.select('user_id')
				.eq('user_id', userId)
				.maybeSingle();
			if (!active) return;
			setAuthorized(!accessError && Boolean(data));
			setChecking(false);
		};

		void client.auth.getSession().then(({ data }) => {
			if (!active) return;
			const session = data.session;
			setSignedIn(Boolean(session));
			if (session) void checkOwner(session.user.id);
			else setChecking(false);
		});

		const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
			if (!active) return;
			setSignedIn(Boolean(session));
			setAuthorized(false);
			if (session) {
				setChecking(true);
				window.setTimeout(() => void checkOwner(session.user.id), 0);
			} else {
				setChecking(false);
			}
		});

		return () => {
			active = false;
			listener.subscription.unsubscribe();
		};
	}, []);

	const signIn = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!supabase) return;
		setBusy(true);
		setError('');
		const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
		if (signInError) setError(signInError.message);
		setBusy(false);
	};

	const signOut = async () => {
		await supabase?.auth.signOut();
		setAuthorized(false);
		setSignedIn(false);
	};

	const editProduct = (product: Product) => {
		setDraft({ ...product, colors: [...product.colors], sizes: [...product.sizes], images: [...product.images] });
		setFiles([]);
		setNotice('');
		setError('');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const save = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!supabase) return;
		if (!draft.sizes.length || !draft.colors.length || (!draft.images.length && !files.length)) {
			setError('Add at least one size, one color and one product image.');
			return;
		}

		setBusy(true);
		setError('');
		setNotice('');
		try {
			const uploadedImages = [...draft.images];
			for (const file of files) {
				if (file.size > 8 * 1024 * 1024) throw new Error(`${file.name} exceeds the 8 MB image limit.`);
				const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
				const path = `${draft.id}/${crypto.randomUUID()}.${extension}`;
				const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file);
				if (uploadError) throw uploadError;
				uploadedImages.push(supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl);
			}
			await saveProduct({ ...draft, images: uploadedImages });
			setDraft(newProduct());
			setFiles([]);
			setNotice('Product saved.');
		} catch (saveError) {
			setError(errorMessage(saveError));
		} finally {
			setBusy(false);
		}
	};

	const removeProduct = async (product: Product) => {
		if (!window.confirm(`Delete ${product.name}? This removes it from the shop.`)) return;
		setBusy(true);
		setError('');
		setNotice('');
		try {
			await deleteProduct(product);
			if (draft.id === product.id) setDraft(newProduct());
			setNotice(`${product.name} deleted.`);
		} catch (deleteError) {
			setError(errorMessage(deleteError));
		} finally {
			setBusy(false);
		}
	};

	const toggleSize = (size: Size) => {
		setDraft((current) => ({
			...current,
			sizes: current.sizes.includes(size)
				? current.sizes.filter((item) => item !== size)
				: [...current.sizes, size],
		}));
	};

	if (!supabase) {
		return (
			<main className="min-h-[70vh] bg-chocolate-950 px-6 pt-36 pb-24 text-ivory-100">
				<section className="mx-auto max-w-xl border border-chocolate-700 p-8">
					<p className="text-xs uppercase tracking-wider-2 text-gold">Owner access</p>
					<h1 className="mt-3 font-serif text-3xl">Admin setup required</h1>
					<p className="mt-4 text-sm leading-relaxed text-ivory-200/70">
						Connect this site to Supabase to enable secure sign-in, product uploads and catalog editing.
						Follow the setup steps in <code>supabase/ADMIN_SETUP.md</code>.
					</p>
				</section>
			</main>
		);
	}

	if (checking) {
		return <main className="min-h-[70vh] bg-chocolate-950 px-6 pt-40 text-center text-sm text-ivory-200/70">Checking owner access...</main>;
	}

	if (!signedIn || !authorized) {
		return (
			<main className="min-h-[70vh] bg-chocolate-950 px-6 pt-36 pb-24 text-ivory-100">
				<section className="mx-auto max-w-md border border-chocolate-700 p-8">
					<p className="text-xs uppercase tracking-wider-2 text-gold">Private area</p>
					<h1 className="mt-3 font-serif text-3xl">Owner sign in</h1>
					{signedIn ? (
						<div className="mt-6">
							<p className="text-sm text-ivory-200/70">This account is not authorized to manage the store.</p>
							<button onClick={signOut} className="mt-5 border border-chocolate-600 px-4 py-3 text-xs uppercase tracking-wider-2 hover:border-gold">
								Sign out
							</button>
						</div>
					) : (
						<form onSubmit={signIn} className="mt-6 space-y-4">
							<label className="block text-xs uppercase tracking-wider-2 text-ivory-200/70">
								Email
								<input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-chocolate-600 bg-chocolate-900 px-3 py-3 text-sm normal-case tracking-normal text-ivory-100 outline-none focus:border-gold" />
							</label>
							<label className="block text-xs uppercase tracking-wider-2 text-ivory-200/70">
								Password
								<span className="relative mt-2 block">
									<input required type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border border-chocolate-600 bg-chocolate-900 px-3 py-3 pr-11 text-sm normal-case tracking-normal text-ivory-100 outline-none focus:border-gold" />
									<button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-200/60 hover:text-gold">
										{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
									</button>
								</span>
							</label>
							{error && <p role="alert" className="text-sm text-red-300">{error}</p>}
							<button disabled={busy} className="w-full bg-gold px-4 py-3 text-xs uppercase tracking-wider-2 text-chocolate-950 disabled:opacity-60">
								{busy ? 'Signing in...' : 'Sign in'}
							</button>
						</form>
					)}
				</section>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-chocolate-950 px-6 pt-32 pb-24 text-ivory-100 lg:px-10">
			<div className="mx-auto max-w-[1400px]">
				<header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-chocolate-700 pb-6">
					<div>
						<p className="text-xs uppercase tracking-wider-2 text-gold">Store owner</p>
						<h1 className="mt-2 font-serif text-3xl md:text-4xl">Product admin</h1>
					</div>
					<button onClick={signOut} className="flex items-center gap-2 border border-chocolate-600 px-4 py-3 text-xs uppercase tracking-wider-2 hover:border-gold hover:text-gold">
						<LogOut size={15} /> Sign out
					</button>
				</header>

				<div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
					<form onSubmit={save} className="space-y-6 border border-chocolate-700 p-5 md:p-7">
						<div className="flex items-center justify-between gap-4">
							<h2 className="font-serif text-2xl">{products.some((product) => product.id === draft.id) ? 'Edit product' : 'Add product'}</h2>
							{products.some((product) => product.id === draft.id) && (
								<button type="button" onClick={() => { setDraft(newProduct()); setFiles([]); }} title="New product" className="p-2 text-ivory-200/70 hover:text-gold"><Plus size={19} /></button>
							)}
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<label className="text-xs uppercase tracking-wider-2 text-ivory-200/70 sm:col-span-2">Product name
								<input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="admin-input" />
							</label>
							<label className="text-xs uppercase tracking-wider-2 text-ivory-200/70">Collection
								<select value={draft.collection} onChange={(event) => setDraft({ ...draft, collection: event.target.value as Collection })} className="admin-input">
									{collections.map((collection) => <option key={collection} value={collection}>{collection}</option>)}
								</select>
							</label>
							<label className="text-xs uppercase tracking-wider-2 text-ivory-200/70">Category
								<select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as ProductCategory })} className="admin-input">
									{categories.map((category) => <option key={category} value={category}>{category}</option>)}
								</select>
							</label>
							<label className="text-xs uppercase tracking-wider-2 text-ivory-200/70">Price in naira
								<input required min="1" step="1" type="number" value={draft.price || ''} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })} className="admin-input" />
							</label>
							<label className="text-xs uppercase tracking-wider-2 text-ivory-200/70">Price in dollars
								<input required min="0" step="1" type="number" value={draft.priceUSD ?? ''} onChange={(event) => setDraft({ ...draft, priceUSD: Number(event.target.value) })} className="admin-input" />
							</label>
						</div>

						<label className="block text-xs uppercase tracking-wider-2 text-ivory-200/70">Description
							<textarea required rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className="admin-input resize-y" />
						</label>

						<fieldset>
							<legend className="mb-3 text-xs uppercase tracking-wider-2 text-ivory-200/70">Available sizes</legend>
							<div className="flex flex-wrap gap-2">
								{sizes.map((size) => (
									<label key={size} className={`cursor-pointer border px-3 py-2 text-xs ${draft.sizes.includes(size) ? 'border-gold bg-gold text-chocolate-950' : 'border-chocolate-600 text-ivory-200/70'}`}>
										<input type="checkbox" checked={draft.sizes.includes(size)} onChange={() => toggleSize(size)} className="sr-only" />{size}
									</label>
								))}
							</div>
						</fieldset>

						<fieldset>
							<div className="mb-3 flex items-center justify-between">
								<legend className="text-xs uppercase tracking-wider-2 text-ivory-200/70">Colors</legend>
								<button type="button" onClick={() => setDraft({ ...draft, colors: [...draft.colors, { name: '', hex: '#808080' }] })} className="flex items-center gap-1 text-xs text-gold"><Plus size={14} /> Add color</button>
							</div>
							<div className="space-y-2">
								{draft.colors.map((color, index) => (
									<div key={`${color.name}-${index}`} className="flex items-center gap-3">
										<input aria-label="Color swatch" type="color" value={color.hex} onChange={(event) => setDraft({ ...draft, colors: draft.colors.map((item, i) => i === index ? { ...item, hex: event.target.value } : item) })} className="h-10 w-12 cursor-pointer border border-chocolate-600 bg-transparent p-1" />
										<input aria-label="Color name" required value={color.name} placeholder="Color name" onChange={(event) => setDraft({ ...draft, colors: draft.colors.map((item, i) => i === index ? { ...item, name: event.target.value } : item) })} className="admin-input mt-0 flex-1" />
										<button type="button" aria-label={`Remove ${color.name || 'color'}`} onClick={() => setDraft({ ...draft, colors: draft.colors.filter((_, i) => i !== index) })} className="p-2 text-ivory-200/50 hover:text-red-300"><X size={16} /></button>
									</div>
								))}
							</div>
						</fieldset>

						<fieldset>
							<legend className="mb-3 text-xs uppercase tracking-wider-2 text-ivory-200/70">Product images</legend>
							{draft.images.length > 0 && (
								<div className="mb-3 flex flex-wrap gap-2">
									{draft.images.map((image, index) => (
										<div key={image} className="relative h-20 w-16 overflow-hidden bg-chocolate-800">
											<Img src={image} alt={`${draft.name} ${index + 1}`} className="h-full w-full object-cover" />
											<button type="button" aria-label="Remove image" onClick={() => setDraft({ ...draft, images: draft.images.filter((_, i) => i !== index) })} className="absolute right-1 top-1 bg-chocolate-950/80 p-1"><X size={12} /></button>
										</div>
									))}
								</div>
							)}
							<label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-chocolate-600 px-4 py-5 text-xs text-ivory-200/70 hover:border-gold hover:text-gold">
								<ImagePlus size={17} /> Choose images
								<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => setFiles((current) => [...current, ...Array.from(event.target.files ?? [])])} className="sr-only" />
							</label>
							{files.length > 0 && <p className="mt-2 text-xs text-ivory-200/60">{files.map((file) => file.name).join(', ')}</p>}
						</fieldset>

						{error && <p role="alert" className="text-sm text-red-300">{error}</p>}
						{notice && <p role="status" className="text-sm text-green-300">{notice}</p>}
						<button disabled={busy} className="w-full bg-gold px-5 py-4 text-xs uppercase tracking-wider-2 text-chocolate-950 disabled:opacity-60">
							{busy ? 'Saving...' : 'Save product'}
						</button>
					</form>

					<section>
						<div className="mb-4 flex items-baseline justify-between border-b border-chocolate-700 pb-4">
							<h2 className="font-serif text-2xl">Products</h2>
							<span className="text-xs text-ivory-200/50">{products.length} items</span>
						</div>
						<div className="divide-y divide-chocolate-800">
							{products.map((product) => (
								<article key={product.id} className="flex items-center gap-3 py-3">
									<div className="h-16 w-12 flex-shrink-0 overflow-hidden bg-chocolate-800">
										{product.images[0] && <Img thumb src={product.images[0]} alt="" className="h-full w-full object-cover" />}
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm text-ivory-100">{product.name}</p>
										<p className="mt-1 text-xs text-ivory-200/50">{product.collection} · {formatPrice(product.price)}</p>
									</div>
									<button type="button" onClick={() => editProduct(product)} title={`Edit ${product.name}`} className="p-2 text-ivory-200/60 hover:text-gold"><Pencil size={16} /></button>
									<button type="button" onClick={() => void removeProduct(product)} disabled={busy} title={`Delete ${product.name}`} className="p-2 text-ivory-200/60 hover:text-red-300"><Trash2 size={16} /></button>
								</article>
							))}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
