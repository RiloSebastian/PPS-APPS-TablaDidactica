import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { UsuarioService } from '../servicios/usuario.service';
import { ComplementosService } from 'src/app/servicios/complementos.service';
import { firebaseErrors } from 'src/assets/scripts/errores';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
	public usuario: any = null;
	public subU: any = null;
	public audio = new Audio();
	idioma: string;
	tipo: string;


	constructor(private router: Router, private auth: UsuarioService, private comp: ComplementosService) {
	}

	ngOnInit() {
		console.log('accede a usuario');
		this.subU = this.auth.usuario.subscribe(user => {
			if (user !== null) {
				this.usuario = user;
				console.log(this.usuario);
				this.seleccionaIdioma('español');
				this.seleccionaTipo('animales');
			}
		});
	}

	reproduceSonido(clave: string) {
		this.audio.src = `../../assets/sonidos/${this.idioma}/${clave}.mp3`
		this.audio.play().catch(err=> this.comp.presentToastConMensajeYColor(firebaseErrors(err),'danger'));
	}

	seleccionaIdioma(idioma: string) {
		this.idioma = idioma;
	}

	seleccionaTipo(tipo: string) {
		this.tipo = tipo;
	}

	public cerrarSesion() {
		this.auth.logout().then(() => {
			this.comp.playAudio('error');
			this.router.navigate([''])
		});
	}

	public ngOnDestroy(): void {
		if (this.subU !== null) {
			this.subU.unsubscribe();
		}
	}

}
