// CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = 'https://rbygxkbewzknvjjhxdvw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieWd4a2Jld3prbnZqamh4ZHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMDcxNjQsImV4cCI6MjA4MTU4MzE2NH0.YrHF9HEGo6yv9MyNsPzFgBhaAB1DRh2SLU8f7L6s1nY';
const PAGE_ID = 'portal_trans_alexia';

// 1. SISTEMA DE MODO DE COR (Pride, Trans, Escuro)
function mudarModo(modo) {
    document.body.classList.remove('modo-pride', 'modo-trans', 'modo-escuro');
    document.body.classList.add('modo-' + modo);
    
    // Atualiza botões ativos no topo
    document.querySelectorAll('.modo-botao').forEach(botao => botao.classList.remove('ativo'));
    const botaoAtivo = document.querySelector(`.modo-botao-${modo}`);
    if (botaoAtivo) botaoAtivo.classList.add('ativo');
    
    // Salva preferência localmente
    localStorage.setItem('modoPortal', modo);
    
    // Ativa animação do arco-íris apenas no modo Pride
    document.body.style.animation = (modo === 'pride') ? 'arcoiris 18s ease infinite' : 'none';
}

// 2. SISTEMA DE EXPLICAÇÕES DA SEÇÃO DE EDUCAÇÃO
function mostrarExplicacao(tipo) {
    document.querySelectorAll('.explanation-content').forEach(el => el.classList.remove('active'));
    const explicacao = document.getElementById(`explicacao-${tipo}`);
    if (explicacao) {
        explicacao.classList.add('active');
        if (window.innerWidth < 768) {
            explicacao.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// 3. SISTEMA DE APOIO E CURTIDAS COM SUPABASE API
let curtidas = 0;
let jaCurtiu = false;
let userId = localStorage.getItem('portal_user_id');

// Gera ID único persistente para cada usuário
if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('portal_user_id', userId);
}

// Busca likes do banco de dados do Supabase
async function fetchLikes() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/likes?page_id=eq.${PAGE_ID}`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Range': '0-0',
                'Prefer': 'count=exact'
            }
        });
        
        const contentRange = response.headers.get('content-range');
        if (contentRange) {
            curtidas = parseInt(contentRange.split('/')[1]);
        }

        // Verifica se este usuário em específico já deu seu apoio
        const checkResponse = await fetch(`${SUPABASE_URL}/rest/v1/likes?page_id=eq.${PAGE_ID}&user_id=eq.${userId}`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        const userLikes = await checkResponse.json();
        jaCurtiu = userLikes.length > 0;

        updateCurtidasDisplay();
    } catch (error) {
        console.error('Erro ao carregar curtidas:', error);
        const likeMsg = document.getElementById('likeMessage');
        if (likeMsg) likeMsg.textContent = 'Erro ao carregar dados do Supabase.';
    }
}

// Atualiza exibição dos contadores e estados do botão
function updateCurtidasDisplay() {
    const likeCount = document.getElementById('likeCount');
    const likeBtn = document.getElementById('likeBtn');
    const likeMsg = document.getElementById('likeMessage');
    
    if (likeCount) likeCount.textContent = curtidas.toLocaleString('pt-BR');
    
    if (jaCurtiu && likeBtn) {
        likeBtn.innerHTML = '✅ Você já apoiou!';
        likeBtn.disabled = true;
        likeBtn.style.background = 'linear-gradient(45deg, #10b981, #34d399)';
        if (likeMsg) likeMsg.textContent = 'Obrigada pelo seu apoio e carinho! 💖';
    } else if (likeMsg) {
        likeMsg.textContent = 'Clique no botão acima para demonstrar seu apoio!';
    }
}

// Envia uma nova curtida de apoio para o banco de dados
async function curtirPagina() {
    if (jaCurtiu) return;

    const likeBtn = document.getElementById('likeBtn');
    if (!likeBtn) return;
    
    likeBtn.disabled = true;
    likeBtn.innerHTML = '⌛ Enviando...';

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/likes`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                page_id: PAGE_ID,
                user_id: userId
            })
        });

        if (response.ok) {
            curtidas += 1;
            jaCurtiu = true;
            updateCurtidasDisplay();
            
            // Pequeno feedback visual no contador
            const likeCount = document.getElementById('likeCount');
            if (likeCount) {
                likeCount.style.transform = 'scale(1.3)';
                likeCount.style.color = '#f472b6';
                setTimeout(() => {
                    likeCount.style.transform = 'scale(1)';
                    likeCount.style.color = '';
                }, 300);
            }
        } else {
            throw new Error('Falha ao registrar curtida no banco');
        }
    } catch (error) {
        console.error('Erro ao curtir:', error);
        alert('Não foi possível registrar seu apoio. Verifique as configurações de rede.');
        likeBtn.disabled = false;
        likeBtn.innerHTML = '❤️ Curtir esta página';
    }
}

// 4. INICIALIZAÇÃO E AÇÕES AO CARREGAR O DOM
document.addEventListener('DOMContentLoaded', () => {
    // Carrega o tema salvo no navegador (ou o Pride padrão)
    const modoSalvo = localStorage.getItem('modoPortal') || 'pride';
    mudarModo(modoSalvo);
    
    // Conecta cliques do botão de apoio
    const likeBtn = document.getElementById('likeBtn');
    if (likeBtn) {
        likeBtn.addEventListener('click', curtirPagina);
    }
    
    // Busca dados de apoio no banco Supabase
    fetchLikes();
    
    // Configura rolagem suave para links internos de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ 
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth' 
                });
            }
        });
    });
});
