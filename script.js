const championList = document.querySelector('.champion-list');
const selectedChampionsImages = document.getElementById('selected-champions-images');
const selectedChampionsInfoContainer = document.getElementById('selected-champions-info-container');
const selectedChampionsInfo = document.getElementById('selected-champions-info');
const compositionWarning = document.getElementById('composition-warning');
const championAbilities = document.getElementById('champion-abilities');


const championData = {
    'garen.jpg': {
        type: 'AD',
        name: 'Garen',
        passive: 'Azim',
        q: 'Yıkıcı Darbe',
        w: 'Cesaret',
        e: 'Yargı',
        r: 'Demacia\'nın Adaleti'
    },
    'yasuo.jpg': {
        type: 'AD',
        name: 'Yasuo',
        passive: 'Avarenin Yolu',
        q: 'Çelik Fırtına',
        w: 'Rüzgar Duvarı',
        e: 'Atılgan Kılıç',
        r: 'Son Nefes'
    },
    'ahri.jpg': {
        type: 'AP',
        name: 'Ahri',
        passive: 'Vasistas Hırsızı',
        q: 'Aldatan Küre',
        w: 'Tilki Ateşi',
        e: 'Ayartan Öpücük',
        r: 'Ruh Hücumu'
    },
    'malphite.jpg': {
        type: 'AP',
        name: 'Malphite',
        passive: 'Granit Kalkan',
        q: 'Sismik Parça',
        w: 'Gök Gürültüsü Patlaması',
        e: 'Yerin Darbesi',
        r: 'Durdurulamaz Güç'
    },
    'jinx.jpg': {
        type: 'AD',
        name: 'Jinx',
        passive: 'Heyecan!',
        q: 'Değiştir!',
        w: 'Fisilti',
        e: 'Patlangaçlar!',
        r: 'Süper Mega Ölüm Roketi!'
    },
    'leona.jpg': {
        type: 'AD',
        name: 'Leona',
        passive: 'Gün Işığı',
        q: 'Şafak Kalkanı',
        w: 'Tutulma',
        e: 'Ufuk Kılıcı',
        r: 'Güneş Parıltısı'
    },
    'lux.jpg': {
        type: 'AP',
        name: 'Lux',
        passive: 'Işık Patlaması',
        q: 'Işık Bağlaması',
        w: 'Prizmatik Bariyer',
        e: 'Işık Hırsızlığı',
        r: 'Son Parıltı'
    },
    'orianna.jpg': {
        type: 'AP',
        name: 'Orianna',
        passive: 'Kurmalı Kurbağa',
        q: 'Komut: Saldır',
        w: 'Komut: Uyumsuzluk',
        e: 'Komut: Koruma',
        r: 'Komut: Şok Dalgası'
    },
    'vayne.jpg': {
        type: 'AD',
        name: 'Vayne',
        passive: 'Gece Avcısı',
        q: 'Takla',
        w: 'Gümüş Oklar',
        e: 'Kazık',
        r: 'Son Saat'
    },
    'ezreal.jpg': {
        type: 'AD',
        name: 'Ezreal',
        passive: 'Yükselen Güç',
        q: 'Mistik Atış',
        w: 'Özsel Geçiş',
        e: 'Sihirsel Sıçrama',
        r: 'İsabetli Atış'
    },


Object.keys(championData).forEach(image => {
    const img = document.createElement('img');
    img.src = `images/${image}`;
    img.addEventListener('click', () => {
        addSelectedChampion(image);
    });
    championList.appendChild(img);
});


const selectedChampions = [];

// Seçilen şampiyonları ekleme fonksiyonu
function addSelectedChampion(image) {
    if (selectedChampions.length < 5 && !selectedChampions.includes(image)) {
        selectedChampions.push(image);
        updateSelectedChampions();
        checkTeamComposition();
    }
}


function updateSelectedChampions() {
    selectedChampionsImages.innerHTML = '';
    selectedChampionsInfo.innerHTML = '';
    selectedChampions.forEach(champion => {
        const img = document.createElement('img');
        img.src = `images/${champion}`;
        img.addEventListener('click', () => {
            removeSelectedChampion(champion);
        });
        selectedChampionsImages.appendChild(img);

        const championInfo = championData[champion];
        const championDiv = document.createElement('div');
        championDiv.textContent = `${championInfo.name} (${championInfo.type})`;
        selectedChampionsInfo.appendChild(championDiv);
    });

    if (selectedChampions.length > 0) {
        selectedChampionsInfoContainer.style.display = 'flex';
        showChampionAbilities(); // Şampiyon varsa yetenekleri göster
    } else {
        selectedChampionsInfoContainer.style.display = 'none';
        championAbilities.innerHTML = ''; // Şampiyon yoksa yetenekleri temizle
    }
}


function removeSelectedChampion(champion) {
    const index = selectedChampions.indexOf(champion);
    if (index > -1) {
        selectedChampions.splice(index, 1);
        updateSelectedChampions();
        checkTeamComposition();
    }
}


function checkTeamComposition() {
    let adCount = 0;
    let apCount = 0;
    selectedChampions.forEach(champion => {
        if (championData[champion].type === 'AD') {
            adCount++;
        } else {
            apCount++;
        }
    });

    if (selectedChampions.length > 0) {
        compositionWarning.style.display = 'block';
        if (adCount > apCount) {
            compositionWarning.textContent = 'Takımda AD şampiyonlar fazla!';
        } else if (apCount > adCount) {
            compositionWarning.textContent = 'Takımda AP şampiyonlar fazla!';
        } else {
            compositionWarning.textContent = 'Takımın AD ve AP karakteri Dengede!';
        }
    } else {
        compositionWarning.style.display = 'none';
    }
}


function showChampionAbilities() {
    championAbilities.innerHTML = '';
    selectedChampions.forEach(champion => {
        const championInfo = championData[champion];
        const abilityBar = document.createElement('div');
        abilityBar.classList.add('ability-bar');
        abilityBar.innerHTML = `
            <h3>${championInfo.name} Yetenekleri</h3>
            <p>Pasif: ${championInfo.passive}</p>
            <p>Q: ${championInfo.q}</p>
            <p>W: ${championInfo.w}</p>
            <p>E: ${championInfo.e}</p>
            <p>R: ${championInfo.r}</p>
        `;
        championAbilities.appendChild(abilityBar);
    });
}


selectedChampionsInfoContainer.style.display = 'none';
compositionWarning.style.display = 'none';
