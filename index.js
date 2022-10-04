new Vue({
    el: '#app',
    data: {
        jogador: {
            vida: 100,
            vidaPercent: '100%',
            ataque: 10,
            megazord: 15,
            cura: 10,
            perdeu: false
        },
        monstro: {
            vida: 100,
            vidaPercent: '100%',
            ataque: 12,
            megazord: 17,
            cura: 12,
            perdeu: false
        },
        jogadas: []
    },
    watch: {
        'jogador.vida': function() {
            this.jogador.vidaPercent = this.jogador.vida + '%';

            if(this.jogador.vida <= 0){
                this.jogador.perdeu = true;
                this.jogador.vida = 0;
                this.jogador.vidaPercent = '0%';
            }

            if(this.jogador.vida >= 100){
                this.jogador.vida = 100;
                this.jogador.vidaPercent = '100%';
            }

        },
        'monstro.vida': function() {
            this.monstro.vidaPercent = this.monstro.vida + '%';

            if(this.monstro.vida <= 0){
                this.monstro.perdeu = true;
                this.monstro.vida = 0;
                this.monstro.vidaPercent = '0%';
            }

            if(this.monstro.vida >= 100){
                this.monstro.vida = 100;
                this.monstro.vidaPercent = '100%';
            }
        }
    },
    methods: {
        atacar(){
            let ataqueMonstro = this.getValorJogada(this.monstro.ataque);
            let ataquePlayer = this.getValorJogada(this.jogador.ataque)

            this.jogador.vida -= ataqueMonstro;
            this.monstro.vida -= ataquePlayer;

            this.setJogada('Monstro', 'ataque', ataqueMonstro)
            this.setJogada('Jogador', 'ataque', ataquePlayer)
        },
        curar(){
            
            let curaJogador = this.getValorJogada(this.jogador.cura);
            let curaMontros = this.getValorJogada(this.monstro.cura);
            
            this.jogador.vida += curaJogador;
            this.monstro.vida += curaMontros;

            this.setJogada('Monstro', 'cura', curaMontros)
            this.setJogada('Jogador', 'cura', curaJogador)
        },
        especial(){
            
            let monstroMega = this.getValorJogada(this.monstro.megazord);
            let playerMega = this.getValorJogada(this.jogador.megazord);
            
            this.jogador.vida -= monstroMega;
            this.monstro.vida -= playerMega;

            this.setJogada('Monstro', 'especial', monstroMega)
            this.setJogada('Jogador', 'especial', playerMega)
        },
        getValorJogada(valor){
            return Math.floor(Math.random() * valor) + 1;
        },
        setJogada(playerJogada, tipoJogada, valorJogada){
            this.jogadas.push({player:playerJogada, tipo: tipoJogada, valor:  valorJogada})
        },
        reiniciar(){
            this.jogador.vida = 100;
            this.jogador.perdeu = false;
            this.monstro.vida = 100;
            this.jogador.perdeu = false;

            this.jogadas = [];
        }
    }
})