import axios from "axios";
import {ProfileType} from "components/Profile/ProfileContainer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    getProfile (userId: string) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile (userId: string) {
        return instance.get(`profile/${userId}`)
    },
    getStatus (userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus (status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto (photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
    },
    saveProfile (profile: ProfileType) {
        return instance.put(`profile/`, profile)
    },
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captchaUrl: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captchaUrl}).then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data)
    }
}

export const followUnfollowAPI = {
    unfollowUser (id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },
    followUser (id: number) {
        return instance.post(`follow/${id}`, {}).then(response => response.data)
    }
}

export const securityAPI = {
    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
    }
}




