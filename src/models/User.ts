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
    mode: number;
}

export default User