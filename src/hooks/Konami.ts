import { useState, useEffect, useRef, useCallback } from 'react';
import toast from '../components/IndependentSnackbar';
import { capitalizeNthChar } from '../utils/stringUtils';

const useKonamiCode = (): boolean => {
    const [konamiCode, setIsKonami] = useState<boolean>(false);
    const refIndex = useRef('');
    const toggle = useCallback(
        () => {
            if (!konamiCode) {
                toast.default('Pog');
            }
            setIsKonami(!konamiCode);
        },
        [konamiCode, setIsKonami],
    );

    const getStringLastNKeys = (str: string, n: number) => {
        return str.split('').splice((str.split('').length > n ? str.split('').length - n : 0), str.split('').length).join('');
    }
    const allowedKeys: { [key: string]: string } = {
        'ArrowUp': 'U',
        'ArrowDown': 'D',
        'ArrowLeft': 'L',
        'ArrowRight': 'R',
        'A': 'A',
        'B': 'B',
    };

    const onKeyUp = (e: KeyboardEvent) => {
        const key = capitalizeNthChar(e.key);
        if (allowedKeys[key]) {
            if (key !== 'A') {
                refIndex.current += allowedKeys[key];
            }
        } else {
            refIndex.current = '';
        }
        if (/(UUDDLRLRB$)|(UUDDLRLR$)|(UUDDLRL$)|(UUDDLR$)|(UUDDL$)|(UUDD$)|(UUD$)|(U$)/g.test(getStringLastNKeys(refIndex.current, 9))) {
            if (key === 'A' && refIndex.current.substr(-9) === 'UUDDLRLRB') {
                toggle();
                refIndex.current = '';
            }
        }
        else {
            refIndex.current = '';
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", onKeyUp);
        return () => {
            window.removeEventListener("keyup", onKeyUp);
        };
    }, [onKeyUp]);

    return konamiCode;
}

export default useKonamiCode
