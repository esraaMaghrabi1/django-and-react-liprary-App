
import { useState, useEffect } from "react";
import axios from "axios";

/*const Sections = [
    {
        id: 1,
        type: "Math books",
        books: [
            {
                id: 1,
                img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1494968639l/14831827.jpg',
                button: 'Borrow',
                showMenu: false,
                borrowed: false,
                brrowerInfo:
                {
                    name: '',
                    email: '',
                    dateFrom: null,
                    dateTo: null,
                }
            },
            {
                id: 2,
                img: 'https://images-na.ssl-images-amazon.com/images/I/71BNd9mPTSL.jpg',
                button: 'Borrow',
                showMenu: false,
                borrowed: false,
                brrowerInfo:
                {
                    name: '',
                    email: '',
                    dateFrom: null,
                    dateTo: null,
                }
            },
            {
                id: 3,
                img: 'https://images-na.ssl-images-amazon.com/images/I/A1-JtKHN3NL.jpg',
                button: 'Borrow',
                showMenu: false,
                borrowed: false,
                brrowerInfo:
                {
                    name: '',
                    email: '',
                    dateFrom: null,
                    dateTo: null,
                }
            }],
    },
    {
        id: 2,
        type: "Brograming Books",
        books: [
            {
                id: 1,
                img: 'https://th.bing.com/th/id/OIP.JEA27GGYU1xmFWsAz6LIBgHaJd?pid=ImgDet&rs=1',
                button: 'Borrow',
                showMenu: false,
                borrowed: false,
                brrowerInfo:
                {
                    name: '',
                    email: '',
                    dateFrom: null,
                    dateTo: null,
                }
            },
            {
                id: 1,
                img: 'https://donkeytime.org/img/f96ebe30ebf56db592311e9652194094.jpg',
                button: 'Borrow',
                showMenu: false,
                borrowed: false,
                brrowerInfo:
                {
                    name: '',
                    email: '',
                    dateFrom: null,
                    dateTo: null,
                }
            }],
    },
];*/
export async function getServerSideProps() {
    const sec = await (await axios.get('http://127.0.0.1:8000/book-section/')).data
    const book = await (await axios.get('http://127.0.0.1:8000/book/')).data
    const bInfo = await (await axios.get('http://127.0.0.1:8000/borower-information/')).data

    return {
        props: {
            sections: sec,
            books: book,
            borowerInformation: bInfo
        }
    }
}

function Liprary({ sections, books, borowerInformation }) {
    const [borrow, setBorrow] = useState(books);
    const [borowerInfo, setBorowerInfo] = useState(borowerInformation);

    return (<>
        <nav class="navbar navbar-expand-lg shadow-md py-2 bg-teal-600 relative flex items-center w-full justify-between">
            <div class="px-6 w-full flex flex-wrap items-center justify-between">
                <div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
                    <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
                        <li class="nav-item">
                            <a class="text-2xl font-bold nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Library for Borrowing Books</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        {sections.map((sec) => (
            <div >
                <div class="mx-32 mt-14">
                    <h1 class="text-2xl font-bold underline-offset-2 underline mt-0 mb-3 text-gray-600 ">{sec.type}</h1>
                </div>
                <div class="rounded-lg shadow-lg bg-gray-200 text-gray-600 py-6 px-6 mb-14 mx-32">
                    <div class="p-2 flex">
                        {books.map(function (book) {
                            if (this == book.section) {
                                return (
                                    <div class="mr-10 grid place-items-center">
                                        <img class="rounded-lg shadow-lg m-5 w-32" src={book.img} alt="" />
                                        <div class="w-44 text-center">
                                            <button onClick={() => setBorrow(book.showMenu = !book.showMenu)} type="button" class=" inline-block px-6 py-2.5 bg-teal-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-800 hover:shadow-lg focus:bg-teal-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-900 active:shadow-lg transition duration-150 ease-in-out">{book.bottun}</button>
                                        </div>
                                        {book.showMenu ?
                                            <div className='divDisplay'>
                                                {book.borrowed ?
                                                    borowerInfo.map(function (Borower) {

                                                        if (this === Borower.book && new Date(Borower.DateTo) >= new Date()) {
                                                            return (
                                                                <h1 class="m-3 text-center mb-3 font-bold text-gray-600">This book is borrowed by {Borower.name} from {Borower.dateFrom} to {Borower.DateTo}</h1>)
                                                        }
                                                    }, book.id) :
                                                    <div class="m-3">
                                                        <h1 class="text-center mb-3 font-bold text-gray-600">Borrower Information</h1>
                                                        <input type="text" class="inputStyle  focus:border-blue-600 " id="name" placeholder="Full name" value={borowerInfo.name} onChange={e => setBorowerInfo(borowerInformation.name = e.target.value)} />
                                                        <input type="email" class=" my-3 inputStyle  focus:border-blue-600 " id="email" placeholder="Email" value={borowerInfo.email} onChange={e => setBorowerInfo(borowerInformation.email = e.target.value)} />
                                                        <label htmlFor="datefrom" class="text-gray-600">Borrowing From:</label>
                                                        <input type="date" class="mb-2 inputStyle  focus:border-blue-600" value={borowerInfo.dateFrom} onChange={e => setBorowerInfo(borowerInformation.dateFrom = e.target.value)} />
                                                        <label htmlFor="dateto" class="text-gray-600">Borrowing To:</label>
                                                        <input type="date" class="mb-3 inputStyle  focus:border-blue-600" value={borowerInfo.DateTo} onChange={e => setBorowerInfo(borowerInformation.DateTo = e.target.value)} />
                                                        <button onClick={async () => {
                                                            setBorrow(book.borrowed = true, book.bottun = 'Borrowed', book.showMenu = !book.showMenu);
                                                            const newborowerInfo = { book: book.id, dateFrom: borowerInformation.dateFrom, DateTo: borowerInformation.DateTo, name: borowerInformation.name, email: borowerInformation.email };
                                                            await axios.put('http://127.0.0.1:8000/borower-information/', newborowerInfo);
                                                            await axios.put('http://127.0.0.1:8000/book/', book);
                                                            borowerInformation = await (await axios.get('http://127.0.0.1:8000/borower-information/')).data;
                                                            setBorowerInfo(borowerInformation);
                                                        }
                                                        }
                                                            type="button" class="w-full inline-block px-6 py-2.5 bg-teal-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-800 hover:shadow-lg focus:bg-teal-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-900 active:shadow-lg transition duration-150 ease-in-out">Done</button>
                                                    </div>}
                                            </div> : <div></div>}
                                    </div>)
                            } return;
                        }, sec.id)}
                    </div>
                </div>
            </div>))}
    </>);
}

export default Liprary;