interface User {
    id: string;
    username: string;
    password?: string;
    accountType: number;
    firstName: string;
    lastName: string;
    email: string;
    balance: number;
    points: number;
    schoolId?: string;
    mode: number;
    iat?: number
}

export default User