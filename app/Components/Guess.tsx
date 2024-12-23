interface GuessProps {
    data: {
        name: string;
        country: string;
        role: string;
        retired: string;
        year: number;
        style: string;
        matches: number;
        ipl: string;
    };
}

export default function Guess({data}: GuessProps) {
    return (
        <div className="flex w-4/5 mx-auto my-1">
            <div className="p-[30px_10px] border-solid border-t-2 border-r-2 border-b-2 border-l-0" style={{ borderColor: '#cc5147', width: '15%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{data['name']}</div>
            <div className="p-[30px_10px] border-solid border-t-2 border-r-2 border-b-2 border-l-0" style={{ borderColor: '#cc5147', width: '15%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{data['country']}</div>
            <div className="p-[30px_10px] border-solid border-t-2 border-r-2 border-b-2 border-l-0" style={{ borderColor: '#cc5147', width: '15%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{data['role']}</div>
            <div className="p-[30px_10px] border-solid border-t-2 border-r-2 border-b-2 border-l-0" style={{ borderColor: '#cc5147', width: '15%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{data['retired']}</div>
            <div className="p-[30px_10px] border-solid border-t-2 border-r-2 border-b-2 border-l-0" style={{ borderColor: '#cc5147', width: '15%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{data['year']}</div>
            <div className="p-[30px_10px] border-solid border-t-2 border-r-2 border-b-2 border-l-0" style={{ borderColor: '#cc5147', width: '15%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{data['style']}</div>
            <div className="p-[30px_10px] border-solid border-t-2 border-r-2 border-b-2 border-l-0" style={{ borderColor: '#cc5147', width: '15%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{data['matches']}</div>
            <div className="p-[30px_10px] border-solid border-t-2 border-r-2 border-b-2 border-l-0" style={{ borderColor: '#cc5147', width: '15%', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{data['ipl']}</div>
        </div>
    )
}