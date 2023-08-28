import { createPost } from '@/repository/index';

export const postService = {
    createPost: async (postData) => {
        try {
            console.log('service, postData::', postData);
            const post = await createPost(postData);
            console.log('repository -> service', post);
            return post;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }
    
}