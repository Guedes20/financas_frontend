class LocalStorageService{

    static adicionarItem(chave, valor){
        console.log(chave +' '+valor);
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    static obterItem(chave){
          const item = localStorage.getItem(chave);
          console.log(item);
          return JSON.parse(item);
        }

}

export default LocalStorageService;