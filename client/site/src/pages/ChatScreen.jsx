import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const ChatItem = ({ chat }) => {
    return (
        <li className='chat-item'>
            <div className='text'>
                <strong className='author'>{chat.name}: </strong> {chat.text}
            </div>
            <div className='createdAt'>{dayjs(chat.createdAt).format('YYYY-MM-DD HH:mm')}</div>
        </li>
    );
};

export const ChatScreen = () => {
    const intRef = useRef(null);
    const [finished, setFinished] = useState(false);
    const [chats, setChats] = useState([]);
    const [userName, setUserName] = useState(`Зочин`);
    const [text, setText] = useState('');

    useEffect(() => {
        axios
            .get(`http://192.168.1.49:3005/api/chats`)
            .then((res) => {
                setChats(res.data.body.reverse());
                setFinished(true);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (finished) {
            clearInterval(intRef.current);
            intRef.current = setInterval(() => {
                axios
                    .get(`http://192.168.1.49:3005/api/chats/last`)
                    .then((res) => {
                        if (res.data.body.id !== chats[0].id) setChats([res.data.body, ...chats]);
                    })
                    .catch((err) => console.log(err));
            }, 500);
        }
    }, [finished]);

    const send = (e) => {
        e.preventDefault();
        if (!text) {
            alert(`Хоосон зурвас илгээх боломжгүй!`);
            return;
        }

        setText(``);

        axios
            .post(
                `http://192.168.1.49:3005/api/chats`,
                {
                    name: userName,
                    text,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((res) => console.log(res.data.body))
            .catch((err) => console.log(err));
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-sm-6'>
                    <div className='chat-container'>
                        <div className='wrapper'>
                            <ul>
                                {chats.map((chat) => {
                                    return <ChatItem chat={chat} key={chat.id} />;
                                })}
                            </ul>
                        </div>
                        <form onSubmit={send}>
                            <textarea onChange={(e) => setText(e.target.value)} value={text}></textarea>
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
