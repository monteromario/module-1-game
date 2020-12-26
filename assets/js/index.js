window.onload = () => {
    const game = new Game('game-canvas')

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
    })

    document.querySelectorAll('#btn-r').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 82,})
        })
        })
    
    document.querySelectorAll('#btn-enter').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 13,})
        })
        })

    document.querySelectorAll('#btn-space').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 32,})
        })
        })

    document.querySelectorAll('#btn-up').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 38, type: 'keydown'})
        })
        })
    
    document.querySelectorAll('#btn-left').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 37, type: 'keydown'})
        })
        })

    document.querySelectorAll('#btn-right').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 39, type: 'keydown'})
        })
        })

    document.querySelectorAll('#btn-down').forEach(click => {
        click.addEventListener('click', () => {
            game.onKeyEvent({keyCode: 40, type: 'keydown'})
        })
        })
    
    document.querySelectorAll('#volume').forEach(click => {
        click.addEventListener('click', () => {
        if (VOLUME > 0) {
            game.sounds.theme.pause();
            VOLUME = 0;
            document.querySelector('#vol-ico').classList.remove("fa-volume-up");
            document.querySelector('#vol-ico').classList.add("fa-volume-mute");
            document.querySelector('#vol-ico').classList.add("red");
        } else {
            game.sounds.theme.play();
            VOLUME = 0.05;
            document.querySelector('#vol-ico').classList.remove("fa-volume-mute");
            document.querySelector('#vol-ico').classList.remove("red");
            document.querySelector('#vol-ico').classList.add("fa-volume-up");
            }
        })
        })

    document.querySelectorAll('#exit').forEach(click => {
        click.addEventListener('click', () => {
            game.sounds.thank_you.play();
            game.sounds.thank_you.volume = VOLUME
            game.ctx.save()
            game.ctx.fillStyle = 'rgba(93, 100, 117, 0.5)'
            game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height)
            clearInterval(game.drawInterval)
            game.drawInterval = undefined;
            game.ctx.restore()
            setTimeout(() => { 
                location.reload();
            }, 2500);
        })
        })

    document.querySelectorAll('#intro').forEach(click => {
        click.addEventListener('click', () => {
            game.sounds.press_start.play();
            game.sounds.press_start.volume = VOLUME
        })
        })

    document.querySelectorAll('#settings-btn').forEach(click => {
        click.addEventListener('click', () => {
            document.getElementById("intro").setAttribute("style", "display: none;");
            document.getElementById("intro_footer").setAttribute("style", "display: none;");
            document.getElementById("settings").removeAttribute("style");
            setSettingsHTML();
        })
        })

    document.querySelectorAll('#instructions-btn').forEach(click => {
        click.addEventListener('click', () => {
            document.getElementById("intro").setAttribute("style", "display: none;");
            document.getElementById("intro_footer").setAttribute("style", "display: none;");
            document.getElementById("instructions").removeAttribute("style");
            document.getElementById('instructions').innerHTML = `
                <p><strong>Instructions</strong></p>
                <br>
                <p>Move left: <i class="fas fa-arrow-left fa-lg grey"></i></p>
                <p>Move right: <i class="fas fa-arrow-right fa-lg grey"></i></p>
                <p>Move up: <i class="fas fa-arrow-up fa-lg grey"></i></p>
                <p>Move down: <i class="fas fa-arrow-down fa-lg grey"></i></p>
                <p>Fire: <i class="fas fa-arrows-alt-h fa-2x grey"></i> (space)</p>
                <p>Fire balls: <img src="assets/img/flower.png" width="25"></p>
                <p>Extra life: <img src="assets/img/mushroom.png" width="25"></p>
                <p>Invencibility: <img src="assets/img/star.png" width="25"></p>
                <p>Enemies: <img src="assets/img/enemy_1.png" width="25"> <img src="assets/img/enemy_2.png" width="20"> <img src="assets/img/enemy_3.png" width="25"></p>
                <img src="./assets/img/macman_logo.png" width="25%">
                <p class="blink"><a id="back-btn">GO BACK</a></p>`;
            setBackBtn();
        })
        })

    document.querySelectorAll('#credits-btn').forEach(click => {
        click.addEventListener('click', () => {
            document.getElementById("intro").setAttribute("style", "display: none;");
            document.getElementById("intro_footer").setAttribute("style", "display: none;");
            document.getElementById("credits").removeAttribute("style");
            document.getElementById('credits').innerHTML = `
                <br><br>
                <p><strong>MAC-MAN</strong></p>
                <br><br>
                <p>Version: ${VERSION} - 2021</p>
                <br><br>
                <p>A tribute to Super Mario Bros&copy; and Pacman&copy;</p>
                <br><br>
                <p>By: <a href="http://www.mariomontero.es" target="_blank">Mario Montero</a></p>
                <br><br><br><br>
                <img src="./assets/img/macman_logo.png" width="25%">
                <br><br>
                <p class="blink"><a id="back-btn">GO BACK</a></p>`;
            setBackBtn();
        })
        })


    function setSettingsHTML() {
        document.getElementById('settings').innerHTML = `
                <br><br>
                <p><strong>Settings</strong></p>
                <br><br>
                <p id="difficulty">Difficulty: <span id="easy-btn">Easy</span> / <span id="medium-btn">Medium</span> / <span id="hard-btn">Hard</span></p>
                <br>
                <p>Movement speed: <span class="grey">${SPEED}</span></p>
                <p>Enemies max speed: <span class="grey">${ENEMIES_MAX_SPEED}</span></p>
                <p>Enemies rate: <span class="grey">x${INIT_ENEMIES}</span></p>
                <br>
                <p>Sounds: <span id="sound-on-btn" >On</span> / <span id="sound-off-btn">Off</span></p>
                <br><br>
                <img src="./assets/img/macman_logo.png" width="25%">
                <br><br>
                <p class="blink"><a id="back-btn">GO BACK</a></p>`
        setBackBtn();
        setSettingsBtn();
    }
    
    function setBackBtn() {
        document.querySelectorAll('#back-btn').forEach(click => {
            click.addEventListener('click', () => {
                document.getElementById("intro").removeAttribute("style")
                document.getElementById("intro_footer").removeAttribute("style")
                document.getElementById("credits").setAttribute("style", "display: none;");
                document.getElementById("instructions").setAttribute("style", "display: none;");
                document.getElementById("settings").setAttribute("style", "display: none;");
            })
            })
    }

    function setSettingsBtn()  {
        document.querySelectorAll('#easy-btn').forEach(click => {
            click.addEventListener('click', () => {
                SPEED = 3
                ENEMIES_MAX_SPEED = 3
                INIT_ENEMIES = 1
                setSettingsHTML();
                document.getElementById("medium-btn").removeAttribute("class");
                document.getElementById("hard-btn").removeAttribute("class");
                document.getElementById("easy-btn").setAttribute("class", "selected");
            })
            })

        document.querySelectorAll('#medium-btn').forEach(click => {
            click.addEventListener('click', () => {
                SPEED = 3
                ENEMIES_MAX_SPEED = 4
                INIT_ENEMIES = 1
                setSettingsHTML();
                document.getElementById("easy-btn").removeAttribute("class");
                document.getElementById("hard-btn").removeAttribute("class");
                document.getElementById("medium-btn").setAttribute("class", "selected");
            })
            })

        document.querySelectorAll('#hard-btn').forEach(click => {
            click.addEventListener('click', () => {
                SPEED = 4
                ENEMIES_MAX_SPEED = 5
                INIT_ENEMIES = 2
                setSettingsHTML();
                document.getElementById("easy-btn").removeAttribute("class");
                document.getElementById("medium-btn").removeAttribute("class");
                document.getElementById("hard-btn").setAttribute("class", "selected");
            })
            })

        document.querySelectorAll('#sound-on-btn').forEach(click => {
            click.addEventListener('click', () => {
                VOLUME = 0.05
                setSettingsHTML();
                document.getElementById("sound-off-btn").removeAttribute("class");
                document.getElementById("sound-on-btn").setAttribute("class", "selected");
            })
            })

        document.querySelectorAll('#sound-off-btn').forEach(click => {
            click.addEventListener('click', () => {
                VOLUME = 0
                setSettingsHTML();
                document.getElementById("sound-on-btn").removeAttribute("class");
                document.getElementById("sound-off-btn").setAttribute("class", "selected");
            })
            })
    }
}
