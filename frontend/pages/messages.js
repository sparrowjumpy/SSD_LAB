import { useEffect, useState } from 'react';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        fetch('http://localhost:8000/api/messages', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        const res = await fetch('http://localhost:8000/api/messages/send', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ receiver, content }),
        });

        if (res.ok) {
            alert('Message sent');
            setReceiver('');
            setContent('');
        } else {
            alert('Failed to send message');
        }
    };

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx}>{msg.content}</li>
                ))}
            </ul>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Receiver"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Message"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button>Send</button>
            </form>
        </div>
    );
}
