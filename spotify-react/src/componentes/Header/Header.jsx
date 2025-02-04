import React from 'react';
import { useState } from 'react';
import './Header.css';
import smallRight from '../../assets/icons/small-right.png';
import smallLeft from '../../assets/icons/small-left.png';
import search from '../../assets/icons/search.png';


function Header() {

   
    const resultArtist = document.getElementById("result-artist");
    const resultPlaylists = document.getElementById('result-playlists');

    const [busca, setBusca] = useState('');

    async function requestApi(busca) {
        if (busca === '') return;
        
        const url = `http://localhost:3001/artists?nameLike=${busca}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            displayResult(result);
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    }

    function displayResult(result) {
        resultPlaylists.classList.add("hidden")
        const artistName = document.getElementById('artist-name');
        const artistImage = document.getElementById('artist-img');
        result.forEach(element => {
            artistName.innerText = element.name;
            artistImage.src = element.urlImg;
        });
        resultArtist.classList.remove('hidden');
    }
        
    
    

    const handleSearch = (e) => {
        const valor = e.target.value.toLowerCase();
        console.log(valor);
        
        if ( busca === '') {
            resultPlaylists.classList.add('hidden');
            resultArtist.classList.remove('hidden');
            return;
    
        }
        setBusca(valor);
        requestApi(valor);
    }




    
    return (
        <nav className="header__navigation">
            <div className="navigation">
                <button className="arrow-left">
                    <img src={smallLeft} alt="Seta esquerda" />
                </button>
                <button className="arrow-right">
                    <img src={smallRight} alt="Seta direita" />
                </button>
            </div>
            <div className="header__search">
                <img src={search} alt="Buscar" />
                <input
                    id="search-input"
                    maxLength="800"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    placeholder="O que você quer ouvir?" 
                    value = {busca}
                    onChange = {handleSearch}/>
            </div>
            <div className="header__login">
                <button className="subscribe">Inscreva-se</button>
                <button className="login">Entrar</button>
            </div>
        </nav>
    );
}



export default Header;