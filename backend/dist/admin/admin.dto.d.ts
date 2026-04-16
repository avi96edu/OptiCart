export declare class CreateAdminDto {
    username: string;
    fullName: string;
    email: string;
    password: string;
    isActive?: boolean;
}
export declare class UpdateAdminDto {
    fullName: string;
    email: string;
    isActive?: boolean;
}
export declare class PasswordDto {
    password: string;
}
