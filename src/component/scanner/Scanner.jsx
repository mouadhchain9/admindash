"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import "./scan.css";
import { useRouter } from 'next/navigation';

const QrCodeScanner = () => {
  const router = useRouter();
  const [qrCodeResult, setQrCodeResult] = useState('');
  const [userId, setUserId] = useState('');
  const [scanning, setScanning] = useState();
  const html5QrcodeScannerRef = useRef(null);

  const parseCustomFormat = (str) => {
    str = str.slice(1, -1);
    const keyValuePairs = str.split(', ');
    const jsonObject = {};

    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      jsonObject[key] = value;
    });

    return jsonObject;
  };

  useEffect(() => {
    if (scanning) {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      
      html5QrcodeScannerRef.current = new Html5Qrcode('reader');
      html5QrcodeScannerRef.current.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          try {
            const result = parseCustomFormat(decodedText);
            setQrCodeResult(decodedText);
            setUserId(result.id);
            router.push(`/adminSide/manageProfile/${result.id}`);
          } catch (error) {
            console.error('Failed to parse QR code result', error);
          }
        },
        (errorMessage) => {
          console.warn('QR Code no longer in front of camera.', errorMessage);
        }
      ).catch(err => {
        console.error('Unable to start scanning', err);
      });
    }
    
    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.stop()
          .then(() => {
            console.log('Scan stopped');
          })
          .catch(err => {
            console.error('Failed to stop scan', err);
          });
      }
    };
  }, [scanning]);

  const startScan = () => {
    setScanning(true);
  };

  const stopScan = () => {
    setScanning(false);
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.stop()
        .then(() => {
          console.log('Scan stopped');
        })
        .catch(err => {
          console.error('Failed to stop scan', err);
        });
    }

  };

  return (
    <div>
      <button className='scan' onClick={startScan}>Scan Now</button>
      {scanning && (
        <div className="modal">
          <div className="modal-content">
            <div>
            <button onClick={stopScan} className="close-button">Close Scan</button>
            </div>
            
            <div id="reader" style={{ width: '300px', height: '220px', borderRadius: '15px' ,overflow: 'hidden' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;







