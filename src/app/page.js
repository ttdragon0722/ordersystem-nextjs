"use client";
import { useState } from "react";
import Menu from "./components/Menu";
import Panel from "./components/Panel";
import Modal from "./components/Modal";
import { SourceProvider } from "@/context/sourceData";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [outputData, setOutputData] = useState("");
    const [outputPrice, setOutputPrice] = useState(0);

    const copyToClipboard = async (text) => {
        try {
            // 檢查是否支援 clipboard API
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                console.log('Text copied to clipboard!');
            } else {
                // 如果不支援，使用傳統的 document.execCommand 方法
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                console.log('Text copied to clipboard!');
            }
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    };


    const output = () => {
        setShowModal(true)
        const data = document.getElementsByClassName("product")
        const output = Array.from(data).map((product) => {
            const name = product.querySelector('.product-name').textContent;
            const price = parseInt(product.querySelector('.product-price').textContent);
            const amount = parseInt(product.querySelector('.amount').value);
            return { name, price, amount };
        });

        let copy = "";
setOutputPrice(0);

        for (const list of output) {
            if (list.amount > 0) {
                if (copy === "") {
                    copy = copy + list.name + "×" + list.amount
                } else {
                    copy = copy + "\n" + list.name + "×" + list.amount
                }
                setOutputPrice((prev)=>{
                    return parseInt(prev) + parseInt(list.price) * parseInt(list.amount);
                })
            }
        }
        console.log(copy);
        // navigator.clipboard.writeText(copy);
        copyToClipboard(copy);
        setOutputData(output);
    }
    return (
        <>
          <SourceProvider>
            <div className="min-w-[320px] max-w-[425px] w-full h-screen m-auto relative">
                <Panel/>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} output={outputData} price={outputPrice}/>
            <Menu menuSwitch={setShowModal} output={output} />
          </SourceProvider>
        </>
    )
}

export default Home;