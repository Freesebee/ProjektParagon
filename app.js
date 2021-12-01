class Produkt {
    
    constructor(
        nazwa,
        ilosc,
        cena,
    ) {
        this.nazwa = nazwa;
        this.ilosc = ilosc;
        this.cena = cena;
    }

    suma() { return this.cena * this.ilosc }
}

class Paragon {

    tablica = []

    aktualizujLocalStorage() {
        localStorage.removeItem('tablica');
        
        localStorage.setItem('tablica', JSON.stringify(this.tablica));

        var retrievedObject = localStorage.getItem('tablica');

        return JSON.parse(retrievedObject);
    }

    dodajProdukt(produkt) {
        this.tablica.push(produkt)
    }

    edytujProdukt(indeks, nowyProdukt) {
        this.tablica[indeks] = nowyProdukt
    }

    usunProdukt(indeks) {
        this.tablica.slice(indeks, 1)
    }
}