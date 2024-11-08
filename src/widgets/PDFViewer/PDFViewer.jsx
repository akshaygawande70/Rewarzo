import React, { useRef } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Card, CardBody, CardHeader, Typography, Button } from '@material-tailwind/react';
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";

export const PDFViewer = ({ fileUrl, watermark }) => {
    const pdfDivRef = useRef(null);

    const renderPage = (props) => (
        <>
            {props.canvasLayer.children}
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                }}
            >
                <div
                    style={{
                        color: 'rgba(0, 0, 0, 0.2)',
                        fontSize: `${5 * props.scale}rem`,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        transform: 'rotate(-45deg)',
                        userSelect: 'none',
                        marginLeft: '10%',
                    }}
                >
                    Nice Software Solutions
                </div>
            </div>
            {props.annotationLayer.children}
            {props.textLayer.children}
        </>
    );

    const handleFullscreen = () => {
        if (pdfDivRef.current.requestFullscreen) {
            pdfDivRef.current.requestFullscreen();
        } else if (pdfDivRef.current.mozRequestFullScreen) { /* Firefox */
            pdfDivRef.current.mozRequestFullScreen();
        } else if (pdfDivRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            pdfDivRef.current.webkitRequestFullscreen();
        } else if (pdfDivRef.current.msRequestFullscreen) { /* IE/Edge */
            pdfDivRef.current.msRequestFullscreen();
        }
    };

    return (
        <div className="flex justify-center p-0">
            <Card className="w-full shadow-lg">
                <CardHeader className="flex justify-between items-center p-4 mt-0" variant="gradient" color="gray">
                    <Typography variant="h5" className="text-white">Document Viewer</Typography>
                    <Button color="white" className="flex items-center gap-2" onClick={handleFullscreen}>
                        <ArrowsPointingOutIcon className="w-5 h-5 text-blue-600" />
                        Expand
                    </Button>
                </CardHeader>
                <CardBody className="p-4">
                    <div ref={pdfDivRef} className="relative" style={{ height: '80vh' }}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer fileUrl={fileUrl} renderPage={watermark && renderPage} />
                        </Worker>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

PDFViewer.defaultProps = {
    watermark: true,
};

export default PDFViewer;
