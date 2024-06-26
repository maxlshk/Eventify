import { FormEvent, useState } from "react";
import { getUserId } from "../../auth";
import { Message } from "../../interfaces/MessageInterface";
import { Form } from "react-router-dom";

//ChatInputProps interface, defines the props for the ChatInput component
interface ChatInputProps {
    chatId: string;
    onSubmit: (chatId: string, message: any) => void;
}

//ChatInput component, displays the input field for sending messages
function ChatInput({ chatId, onSubmit }: ChatInputProps) {
    const [messageContent, setMessageContent] = useState("");
    const userId = getUserId();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!messageContent.trim()) return;
        const date = new Date();

        const isoDateString = date.toISOString().replace('Z', '');

        const message = {
            senderId: userId,
            content: messageContent,
            sendTime: isoDateString,
        } as Message;
        console.log('Message:', message);
        onSubmit(chatId, message);
        setMessageContent("");
    }

    return (

        <Form onSubmit={handleSubmit}>
            <label htmlFor="chat" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50/40 dark:bg-gray-700">
                <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                    </svg>
                    <span className="sr-only">Add emoji</span>
                </button>
                <input
                    id="chat"
                    name="message"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Your message..."
                ></input>
                <button type="submit" className="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-green-100 dark:text-green-500 dark:hover:bg-gray-600">
                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </Form>
    )
}

export default ChatInput