interface Member {
    id: number;
    email: string;
    password: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    subscribeToNewsletter: boolean;
}

const members: Member[] = [];

export default members;
