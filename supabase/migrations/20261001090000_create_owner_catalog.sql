CREATE TABLE IF NOT EXISTS public.store_admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.store_admins ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.store_admins TO authenticated;

DROP POLICY IF EXISTS "admins_read_own_record" ON public.store_admins;
CREATE POLICY "admins_read_own_record" ON public.store_admins
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.is_store_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.store_admins WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_store_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_store_admin() TO authenticated;

CREATE TABLE IF NOT EXISTS public.catalog_products (
  id text PRIMARY KEY,
  product jsonb NOT NULL,
  is_deleted boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.catalog_products ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.catalog_products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.catalog_products TO authenticated;

DROP POLICY IF EXISTS "public_read_catalog_products" ON public.catalog_products;
CREATE POLICY "public_read_catalog_products" ON public.catalog_products
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admins_insert_catalog_products" ON public.catalog_products;
CREATE POLICY "admins_insert_catalog_products" ON public.catalog_products
  FOR INSERT TO authenticated
  WITH CHECK (public.is_store_admin());

DROP POLICY IF EXISTS "admins_update_catalog_products" ON public.catalog_products;
CREATE POLICY "admins_update_catalog_products" ON public.catalog_products
  FOR UPDATE TO authenticated
  USING (public.is_store_admin())
  WITH CHECK (public.is_store_admin());

DROP POLICY IF EXISTS "admins_delete_catalog_products" ON public.catalog_products;
CREATE POLICY "admins_delete_catalog_products" ON public.catalog_products
  FOR DELETE TO authenticated
  USING (public.is_store_admin());

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 8388608, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "public_read_product_images" ON storage.objects;
CREATE POLICY "public_read_product_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "admins_upload_product_images" ON storage.objects;
CREATE POLICY "admins_upload_product_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND public.is_store_admin());

DROP POLICY IF EXISTS "admins_update_product_images" ON storage.objects;
CREATE POLICY "admins_update_product_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images' AND public.is_store_admin())
  WITH CHECK (bucket_id = 'product-images' AND public.is_store_admin());

DROP POLICY IF EXISTS "admins_delete_product_images" ON storage.objects;
CREATE POLICY "admins_delete_product_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND public.is_store_admin());
