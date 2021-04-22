import React from 'react';
import '../styles/popup.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_open'>
                    <h1 className="p head">Welcome to the SNLIDB v2 guide!</h1>
                    <p className="p sub-head">Try to generate and execute each of the following queries and see the results.</p>

                    <div className="guide-samples">
                        <span className="popup-label">A simple SELECT statement</span>
                        <input disabled type="text" value='සියලුම සිසුන්ගේ විස්තර ලබාදෙන්න​' />
                        <CopyToClipboard text="සියලුම සිසුන්ගේ විස්තර ලබාදෙන්න​">
                            {/* onCopy={() => this.setState({ copied: true })}> */}
                            <span data-tip="copy text" className="errspan"><MdContentCopy size={20} /></span>
                        </CopyToClipboard>
                        <input className="exp-res" disabled type="text" value='SELECT * FROM student;​' />

                        <br /><br />

                        <span className="popup-label">A complex SELECT statement</span>
                        <input disabled type="text" value='ලකුනු 75ට වැඩි සිසුන්ගේ නම සහ වයස​ ලබාදෙන්න' />
                        <CopyToClipboard text="ලකුනු 75ට වැඩි සිසුන්ගේ නම සහ වයස​ ලබාදෙන්න">
                            <span data-tip="copy text" className="errspan"><MdContentCopy size={20} /></span>
                        </CopyToClipboard>
                        <input className="exp-res" disabled type="text" value='SELECT name,age FROM student WHERE marks>75;' />

                        <br /><br />

                        <span className="popup-label">An INSERT statement</span>
                        <input disabled type="text" value='නම රවී වන​, වයස 14 වන​, ලකුනු 75ක් ගත් සිසුවාව ඇතුලත් කරන්න' />
                        <CopyToClipboard text="නම රවී වන​, වයස 14 වන​, ලකුනු 75ක් ගත් සිසුවාව ඇතුලත් කරන්න">
                            <span data-tip="copy text" className="errspan"><MdContentCopy size={20} /></span>
                        </CopyToClipboard>
                        <input className="exp-res" disabled type="text" value="INSERT INTO student(name,age,marks) VALUES ('රවී',14,75);​"/>

                        <br /><br />

                        <span className="popup-label">An UPDATE statement</span>
                        <input disabled type="text" value='රවීගේ ලකුන 10 ලෙස වෙනස් කරන්න' />
                        <CopyToClipboard text="රවීගේ ලකුන 10 ලෙස වෙනස් කරන්න">
                            <span data-tip="copy text" className="errspan"><MdContentCopy size={20} /></span>
                        </CopyToClipboard>
                        <input className="exp-res" disabled type="text" value="UPDATE student SET marks=10 WHERE name='රවී';" />

                        <br /><br />

                        <span className="popup-label">A DELETE statement</span>
                        <input disabled type="text" value='15ට අඩුවෙන් ලකුනු ලබාගත් සිසුන්ගේ විස්තර ඉවත් කරන්න​​' />
                        <CopyToClipboard text="15ට අඩුවෙන් ලකුනු ලබාගත් සිසුන්ගේ විස්තර ඉවත් කරන්න​​">
                            <span data-tip="copy text" className="errspan"><MdContentCopy size={20} /></span>
                        </CopyToClipboard>
                        <input className="exp-res" disabled type="text" value="DELETE FROM student WHERE marks<15;" />

                    </div>

                    <ReactTooltip effect="solid" />

                    <button className="popup-btn" onClick={this.props.closePopup}>Close</button>
                </div>
            </div>
        );
    }
}
export default Popup;