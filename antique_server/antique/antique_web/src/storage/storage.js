import { useStorage} from "vue-ls"
export default useStorage(
    {
        namespace: 'pro__', // key prefix
        name: 'ls', // name variable Vue.[ls] or this.[$ls],
        storage: 'local', // storage name session, local, memory
    }
)