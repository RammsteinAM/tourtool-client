import React, { useState, useRef, useCallback, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from 'lodash';
import clsx from 'clsx';
import searchStyles from './searchStyles';

interface Props {
    actionCallback: (value: string) => void;
    styles?: {
        inputStyle?: React.CSSProperties;
        searchIconStyle?: React.CSSProperties;
        closeIconStyle?: React.CSSProperties;
    }
}

const SearchField = ({ actionCallback, styles }: Props) => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const searchFieldRef = useRef<any>(null);
    const classes = searchStyles();
    const delayedDispatchSearchKeyword = useCallback(debounce((value: string) => actionCallback(value), 500), [])

    const handleSearchChange = (event: React.ChangeEvent<{ value: unknown }>) => {    console.log('cahnged ref', searchFieldRef)

        setSearchKeyword(event.target.value as string)
        delayedDispatchSearchKeyword(event.target.value as string);
    };

    const handleSearchOpen = () => {
        actionCallback('');
        setSearchOpen(true);
        setTimeout(() => {
            searchFieldRef?.current?.focus();
        }, 300);
    };

    const handleSearchClose = () => {
        actionCallback('');
        setSearchKeyword('');
        setSearchOpen(false);
    };

    return (
        <div className={classes.searchContainer}>
            <div className={clsx(classes.search, { [classes.searchOpen]: searchOpen })}>
                <SearchIcon onClick={handleSearchOpen} className={classes.searchIcon} style={styles?.searchIconStyle} />
                <Input
                    type='text'
                    style={styles?.inputStyle} 
                    value={searchKeyword}
                    inputRef={searchFieldRef}
                    onChange={handleSearchChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <CloseIcon onClick={handleSearchClose} className={classes.icon} style={styles?.closeIconStyle} />
                        </InputAdornment>
                    }
                />
            </div>
        </div>
    )
}

export default SearchField

// export default React.memo(SearchField, (props: Props, nextProps: Props) => {
//     return (
//         props.actionCallback === nextProps.actionCallback &&
//         props.styles === nextProps.styles
//     )
// })
