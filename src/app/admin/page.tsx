"use client";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase, PortfolioItem } from '@/lib/supabase';
import { PencilSimple, Trash, Plus, Check, X } from '@phosphor-icons/react';

export default function AdminDashboard() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/portfolio');
      const data = await res.json();
      if (data.ok && data.items) {
        setItems(data.items);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (item: Partial<PortfolioItem>) => {
    if (!item.titulo?.trim()) {
      alert("Por favor, informe o título do projeto.");
      return;
    }
    if (!item.categoria) {
      alert("Por favor, selecione o Tipo de Projeto (Categoria).");
      return;
    }
    if (!item.imagem_url?.trim()) {
      alert("Por favor, insira ou envie uma imagem de capa.");
      return;
    }
    try {
      if (isAdding) {
        const payload = { ...item };
        delete payload.id;
        const res = await fetch('/api/admin/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.ok) {
          setIsAdding(false);
          setEditingItem(null);
          fetchItems();
        } else {
          alert("Erro ao salvar: " + data.message);
        }
      } else {
        const res = await fetch('/api/admin/portfolio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        const data = await res.json();
        if (data.ok) {
          setEditingItem(null);
          fetchItems();
        } else {
          alert("Erro ao atualizar: " + data.message);
        }
      }
    } catch (e: any) {
      alert("Erro de conexão: " + e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      try {
        const res = await fetch(`/api/admin/portfolio?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.ok) {
          fetchItems();
        } else {
          alert("Erro ao excluir: " + data.message);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const togglePublish = async (item: PortfolioItem) => {
    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, publicado: !item.publicado })
      });
      if (res.ok) fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading && items.length === 0) {
    return <div className="text-zinc-500 font-mono text-[11px] animate-pulse">CARREGANDO ARQUIVOS...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-[#f4f4f5]">Gestão de Portfólio</h1>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-2">Controle do Arquivo Digital</p>
        </div>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingItem({
              id: '', titulo: '', descricao: '', categoria: '', imagem_url: '',
              publicado: false, ordem: items.length + 1, cliente: '', nicho: '',
              galeria: [], material: '', coords: '', tipo_imagem: 'link'
            } as any);
          }}
          className="flex items-center gap-2 bg-[#c5a880] text-black px-4 py-2 rounded-[2px] font-mono text-[10px] tracking-widest uppercase hover:bg-white transition-colors"
        >
          <Plus size={14} /> Novo Projeto
        </button>
      </div>

      {editingItem && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-[#121215] border border-white/10 w-full max-w-3xl rounded-[2px] shadow-2xl flex flex-col" style={{ maxHeight: '85vh' }}>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0">
              <h2 className="text-xl font-light text-[#f4f4f5] tracking-wide">{isAdding ? 'Novo Trabalho' : 'Editar Trabalho'}</h2>
              <button onClick={() => setEditingItem(null)} className="text-zinc-500 hover:text-white transition-colors p-1 bg-white/5 hover:bg-white/10 rounded-[2px]">
                <X size={18} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar flex-1 min-h-0">
              
              {/* Título & Cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Título *</label>
                  <input type="text" placeholder="Ex: Lurah Cosméticos" value={editingItem.titulo} onChange={e => setEditingItem({...editingItem, titulo: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-[#f4f4f5] focus:border-[#c5a880] focus:shadow-[0_0_10px_rgba(197,168,128,0.1)] outline-none transition-all placeholder:text-zinc-700" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Cliente (opcional)</label>
                  <input type="text" placeholder="Ex: Lurah Spa" value={editingItem.cliente || ''} onChange={e => setEditingItem({...editingItem, cliente: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-[#f4f4f5] focus:border-[#c5a880] focus:shadow-[0_0_10px_rgba(197,168,128,0.1)] outline-none transition-all placeholder:text-zinc-700" />
                </div>
              </div>

              {/* Tipo & Segmento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Serviço (Categoria) *</label>
                  <div className="relative">
                    <select value={editingItem.categoria} onChange={e => setEditingItem({...editingItem, categoria: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-[#f4f4f5] focus:border-[#c5a880] focus:shadow-[0_0_10px_rgba(197,168,128,0.1)] outline-none transition-all appearance-none cursor-pointer">
                      <option value="" disabled>Selecione...</option>
                      <option value="Identidade Visual">Identidade Visual</option>
                      <option value="Naming">Naming</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Sites">Sites</option>
                      <option value="Assessoria">Assessoria</option>
                      <option value="Impressões Gráficas">Impressões Gráficas</option>
                      <option value="Ensaio Fotográfico com IA">Ensaio Fotográfico com IA</option>
                      <option value="BRANDING">Branding & Identidade (Legado)</option>
                      <option value="EDITORIAL">Direção Editorial (Legado)</option>
                      <option value="3D">Branding 3D & Cenografia (Legado)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Nicho (Segmento)</label>
                  <div className="relative">
                    <select value={editingItem.nicho || ''} onChange={e => setEditingItem({...editingItem, nicho: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-[#f4f4f5] focus:border-[#c5a880] focus:shadow-[0_0_10px_rgba(197,168,128,0.1)] outline-none transition-all appearance-none cursor-pointer">
                      <option value="">— Nenhum —</option>
                      <option value="Odontologia">Odontologia</option>
                      <option value="Medicina">Medicina</option>
                      <option value="Dermatologia">Dermatologia</option>
                      <option value="Beleza & Estética">Beleza & Estética</option>
                      <option value="Saúde & Bem-Estar">Saúde & Bem-Estar</option>
                      <option value="Advocacia">Advocacia</option>
                      <option value="Arquitetura">Arquitetura</option>
                      <option value="Design de Interiores">Design de Interiores</option>
                      <option value="Engenharia">Engenharia</option>
                      <option value="Imobiliário">Imobiliário</option>
                      <option value="Moda">Moda</option>
                      <option value="Joalheria & Luxo">Joalheria & Luxo</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Corporativo">Corporativo</option>
                      <option value="Gastronomia">Gastronomia</option>
                      <option value="Alimentação Saudável">Alimentação Saudável</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Educação">Educação</option>
                      <option value="Automotivo">Automotivo</option>
                      <option value="Hotelaria & Turismo">Hotelaria & Turismo</option>
                      <option value="Finanças">Finanças</option>
                      <option value="Consultoria">Consultoria</option>
                      <option value="Eventos">Eventos</option>
                      <option value="Agronegócio">Agronegócio</option>
                      <option value="Arte & Cultura">Arte & Cultura</option>
                      <option value="Outros">Outros</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Descrição (opcional)</label>
                <textarea placeholder="Breve descrição do projeto..." value={editingItem.descricao || ''} onChange={e => setEditingItem({...editingItem, descricao: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-[#f4f4f5] focus:border-[#c5a880] focus:shadow-[0_0_10px_rgba(197,168,128,0.1)] outline-none transition-all h-24 resize-y placeholder:text-zinc-700" />
              </div>

              {/* Imagem */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Imagem *</label>
                <div className="flex mb-4 overflow-hidden border-b border-white/5">
                  <button 
                    className={`flex-1 py-3 text-[10px] font-mono tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${editingItem.tipo_imagem !== 'upload' ? 'bg-[#1a1a1f] text-[#f4f4f5] border-b-2 border-[#c5a880]' : 'text-zinc-500 hover:text-white bg-black/20 hover:bg-black/40'}`}
                    onClick={() => setEditingItem({...editingItem, tipo_imagem: 'link'})}
                  >
                    <span>🔗</span> LINK EXTERNO
                  </button>
                  <button 
                    className={`flex-1 py-3 text-[10px] font-mono tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${editingItem.tipo_imagem === 'upload' ? 'bg-[#1a1a1f] text-[#f4f4f5] border-b-2 border-[#c5a880]' : 'text-zinc-500 hover:text-white bg-black/20 hover:bg-black/40'}`}
                    onClick={() => setEditingItem({...editingItem, tipo_imagem: 'upload'})}
                  >
                    <span>↑</span> UPLOAD
                  </button>
                </div>
                
                {editingItem.tipo_imagem === 'upload' ? (
                  <div className="border border-dashed border-white/10 p-8 text-center rounded-[2px] bg-black/20">
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Funcionalidade de upload em desenvolvimento.</p>
                    <p className="text-zinc-600 text-[11px] mt-2 font-light">Por favor, utilize a opção "Link Externo" por enquanto.</p>
                  </div>
                ) : (
                  <div>
                    <input type="text" placeholder="https://i.pinimg.com/..." value={editingItem.imagem_url} onChange={e => setEditingItem({...editingItem, imagem_url: e.target.value})} className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-[#f4f4f5] focus:border-[#c5a880] focus:shadow-[0_0_10px_rgba(197,168,128,0.1)] outline-none transition-all placeholder:text-zinc-700" />
                    <p className="text-zinc-600 text-[11px] mt-2 font-light">Dica: no Pinterest, clique na imagem, depois em "Abrir imagem" e copie a URL.</p>
                  </div>
                )}
              </div>

              {/* Galeria */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Galeria (Links) (opcional, um por linha)</label>
                <textarea 
                  placeholder="https://link1.jpg&#10;https://link2.jpg" 
                  value={(editingItem.galeria || []).join('\n')} 
                  onChange={e => setEditingItem({...editingItem, galeria: e.target.value.split('\n').filter(l => l.trim() !== '')})} 
                  className="w-full bg-black/40 border border-white/10 p-3 rounded-[2px] text-sm text-[#f4f4f5] focus:border-[#c5a880] focus:shadow-[0_0_10px_rgba(197,168,128,0.1)] outline-none transition-all h-28 resize-y placeholder:text-zinc-700" 
                />
              </div>

              {/* Toggle Publicar */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <h3 className="text-[13px] text-[#f4f4f5] font-medium tracking-wide">Publicar</h3>
                  <p className="text-zinc-500 text-[11px] font-light mt-0.5">Aparece na galeria pública</p>
                </div>
                <button 
                  onClick={() => setEditingItem({...editingItem, publicado: !editingItem.publicado})}
                  className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors ${editingItem.publicado ? 'bg-[#c5a880]' : 'bg-black/60 border border-white/10'}`}
                >
                  <span className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white transition-transform ${editingItem.publicado ? 'translate-x-5 shadow-sm' : 'translate-x-1 shadow-none'}`} />
                </button>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 p-6 border-t border-white/5 bg-black/20 shrink-0">
              <button onClick={() => setEditingItem(null)} className="border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white px-8 py-3 rounded-[2px] font-mono text-[9px] uppercase tracking-widest transition-all">Cancelar</button>
              <button onClick={() => handleSave(editingItem)} className="bg-[#1a1a1f] hover:bg-[#c5a880] text-[#f4f4f5] hover:text-black border border-white/5 px-10 py-3 rounded-[2px] font-mono text-[9px] tracking-widest uppercase transition-all shadow-[0_5px_15px_rgba(0,0,0,0.5)]">Adicionar</button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <div className="bg-[#121215] border border-white/5 rounded-[2px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/40 border-b border-white/5">
            <tr>
              <th className="p-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-normal">Ordem</th>
              <th className="p-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-normal">Projeto</th>
              <th className="p-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-normal">Categoria</th>
              <th className="p-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-normal">Status</th>
              <th className="p-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-normal text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[13px] font-light text-zinc-300">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4 font-mono text-zinc-500">{item.ordem}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img src={item.imagem_url} alt="" className="w-10 h-10 object-cover rounded-[2px] opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="truncate max-w-[200px]">{item.titulo}</span>
                  </div>
                </td>
                <td className="p-4"><span className="font-mono text-[10px] tracking-widest uppercase text-[#c5a880] bg-[#c5a880]/10 px-2 py-1 rounded-[2px]">{item.categoria}</span></td>
                <td className="p-4">
                  <button onClick={() => togglePublish(item)} className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-[2px] transition-colors ${item.publicado ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border border-white/5'}`}>
                    {item.publicado ? 'Público' : 'Rascunho'}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setIsAdding(false); setEditingItem(item); }} className="p-2 hover:bg-white/10 rounded-[2px] transition-colors" title="Editar"><PencilSimple size={16} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-[2px] transition-colors" title="Excluir"><Trash size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Nenhum projeto encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
