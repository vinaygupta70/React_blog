import conf from "../conf/conf"
import {Client, ID, Databases, Storage, Query} from 'appwrite';

export class Service{
    client=new Client()
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.databases= new Databases(this.client);
        this.bucket= new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, UserId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    UserId
                }
            )
        } catch (error) {
            throw error
        }
    }


    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWritecollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deletePost :: error", error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWritecollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries= [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWritecollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    //File upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile:: error", error);
            return false
        }
    }


    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile:: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId,
        )
    }
}

const service = new Service()

export default service