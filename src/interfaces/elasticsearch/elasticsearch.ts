import elasticsearch from 'elasticsearch';

const getClient = () => {
    const client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    })
}

export { getClient }