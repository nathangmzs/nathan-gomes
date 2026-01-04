// Coordenadas aproximadas do centro de Belém (ex: Praça da República)
const BELEM_COORDS = [-1.4583, -48.5089];

// 1. Inicializa o Mapa Leaflet
const map = L.map('map').setView(BELEM_COORDS, 13); // 13 é o nível de zoom inicial

// Adiciona o provedor de tiles (o visual do mapa) - OpenStreetMap é gratuito
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 2. Dados dos Pontos de Coleta (Este seria o seu "banco de dados" JS)
const pontosColeta = [
    {
        id: 1,
        lat: -1.4550,
        lng: -48.4900,
        nome: "Ecoponto Umarizal",
        tipo: ["reciclavel", "eletronico"],
        horario: "Seg-Sex: 8h às 17h",
        descricao: "Ponto de entrega voluntária de grande volume. Aceita pilhas e baterias."
    },
    {
        id: 2,
        lat: -1.4600,
        lng: -48.5050,
        nome: "PEV Nazaré",
        tipo: ["reciclavel", "organico"],
        horario: "24h",
        descricao: "Ponto de Coleta Seletiva 24 horas. Ideal para vizinhança."
    },
    {
        id: 3,
        lat: -1.4700,
        lng: -48.4800,
        nome: "Coleta do Óleo",
        tipo: ["oleo"],
        horario: "Sáb: 9h às 12h",
        descricao: "Local especializado na coleta de óleo de cozinha usado."
    }
    // Adicione mais pontos aqui conforme forem atualizados no painel admin
];

// Variável para armazenar todos os marcadores do mapa
let currentMarkers = [];

// Função para obter o ícone (pode ser personalizada com CSS)
const getIcon = (tipos) => {
    let color = 'blue'; // Padrão
    if (tipos.includes('reciclavel')) color = 'green';
    if (tipos.includes('eletronico')) color = 'red';
    if (tipos.includes('oleo')) color = 'orange';

    // Cria um ícone personalizado simples do Leaflet
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">♻️</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
};

// 3. Função para Adicionar Pontos no Mapa
function renderizarPontos(pontos) {
    // Remove os marcadores antigos
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];

    pontos.forEach(ponto => {
        const icon = getIcon(ponto.tipo);

        // Cria o conteúdo do pop-up
        const popupContent = `
            <h3>${ponto.nome}</h3>
            <p><strong>Aceita:</strong> ${ponto.tipo.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}</p>
            <p><strong>Horário:</strong> ${ponto.horario}</p>
            <p>${ponto.descricao}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${ponto.lat},${ponto.lng}" target="_blank">Traçar Rota (Google Maps)</a>
        `;

        const marker = L.marker([ponto.lat, ponto.lng], { icon: icon })
            .bindPopup(popupContent)
            .addTo(map);
        
        currentMarkers.push(marker);
    });
}

// 4. Lógica de Filtragem
const selectLixo = document.getElementById('tipoLixo');

selectLixo.addEventListener('change', (e) => {
    const tipoSelecionado = e.target.value;

    if (tipoSelecionado === 'todos') {
        renderizarPontos(pontosColeta);
    } else {
        const pontosFiltrados = pontosColeta.filter(ponto => 
            ponto.tipo.includes(tipoSelecionado)
        );
        renderizarPontos(pontosFiltrados);
    }
});

// 5. Função de Geolocalização (Ponto Mais Próximo)
function getUserLocation() {
    if (!navigator.geolocation) {
        alert('Seu navegador não suporta geolocalização.');
        return;
    }

    // Tenta obter a localização do usuário
    navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        // Adiciona um marcador de localização do usuário
        L.marker([userLat, userLng], {
            icon: L.icon({
                iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-red.png', // Marcador vermelho para o usuário
                shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
            })
        }).addTo(map)
        .bindPopup("Você está aqui!")
        .openPopup();

        // Centraliza o mapa na localização do usuário
        map.setView([userLat, userLng], 15);

        // TO-DO: Implementar o cálculo real da distância para encontrar o mais próximo
        // Por enquanto, apenas focamos no visual e na centralização.
        alert('Sua localização foi encontrada! O mapa centralizou no seu ponto.');

    }, () => {
        alert('Não foi possível obter sua localização. Verifique as permissões.');
    });
}

// Inicializa a exibição de todos os pontos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderizarPontos(pontosColeta);
});