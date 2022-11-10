import { articles } from '../api/data';
import { makeAutoObservable, toJS } from 'mobx'
export interface Topic {
    title: string,
    topic: string
}
class Post {
    post: articles | null = null;
    topic: Topic | null = null
    constructor() {
        makeAutoObservable(this)
    }
    setPost(post: articles | null) {
        this.post = post;
    }
    get postData() {
        return toJS(this.post)
    }
    setTopic(topic: Topic | null) {
        this.topic = topic;
    }
    get topicData() {
        return toJS(this.topic)
    }
}
export default new Post;