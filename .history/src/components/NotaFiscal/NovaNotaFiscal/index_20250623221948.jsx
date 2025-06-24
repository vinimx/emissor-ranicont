export default function NovaNotaFiscal() {
  return (
        <SidebarProvider>
      <LayoutComSidebar>
        <div className="mt-20 md:mt-10 m-2 sm:m-4 space-y-4 sm:space-y-6">
          <HeaderPagina
            titulo="Notas Fiscais"
            subtitulo="Gerencie suas notas fiscais"
            acao={
              <Button
                asChild
                className="bg-[var(--sidebar-primaria)] text-[var(--primaria-texto)] font-medium transition-colors hover:bg-[var(--primaria-hover)] rounded-[var(--raio)]"
              >
                <Link to="/nova">
                  <Plus className="h-4 w-4 mr-2" />
                  Emitir Nova NF-e
                </Link>
              </Button>
            }
          />
  );
}
