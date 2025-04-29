import supabase from '../db/supabaseClient';
import { AuthResponse } from '@supabase/supabase-js';

export interface SignUpData {
    email: string;
    password: string;
    username?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const signUpUser = async ({ email, password, username }: SignUpData) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username
            }
        }
    });

    if (error) throw error;
    
    // If signup successful and username provided, create a profile
    if (data.user && username) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ 
                user_id: data.user.id,
                username,
                email
            }]);

        if (profileError) throw profileError;
    }

    return data;
};

export const loginUser = async ({ email, password }: LoginData): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;
    return data;
};

export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
};

export const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.PASSWORD_RESET_URL
    });
    if (error) throw error;
};

export const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });
    if (error) throw error;
};