import apiService from '../apiservice';
import ApiService from '../apiservice';
import ErroValidacao from '../execption/ErroValidacao';

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuaio(id) {
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario) {
        return this.post('/', usuario);
    }

validar(usuario){
    const erros = [];

    if (!usuario.nome) {
        erros.push('O campo Nome é obrigatorio');
    }
    
    if (!usuario.email) {
        erros.push('O campo Email é obrigatorio');
    } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
        erros.push('Infome um Email válido.');
    }
    
    if (!usuario.senha || !usuario.senhaRepeticao) {
        erros.push('Digite a senha 2x.');
    } else if (usuario.senha !== usuario.senhaRepeticao) {
        erros.push('As senhas não coincidem.');
    }

    if (erros && erros.length > 0) {
        throw new ErroValidacao(erros);
    }

 }

}

export default UsuarioService;