import * as React from 'react';
import clsx from 'clsx';
import { createFilterOptions } from '@mui/base';
import { Paper, Popper, Checkbox } from '@mui/material'
import {
  inputRoot,
  AutocompleteGroupLabel,
  AutocompleteGroupUl,
  AutocompletePopper,
  useUtilityClasses,
  AutocompletePaper,
  AutocompleteListbox,
  AutocompleteEndAdornment,
  AutocompleteClearIndicator,
  AutocompletePopupIndicator,
} from './index.styles'
import useAutocomplete from './useAutocomplete'

import Chip from '../Chip'
import { ArrowDropDownIcon, CloseIcon, DoneIcon } from '../icons'
import { AutocompleteProps } from './interface'
import MenuItem from '../MenuItem'

export { createFilterOptions };

type IProps = AutocompleteProps<any, boolean, boolean, boolean>
const Autocomplete: React.FC<IProps> = React.forwardRef((props, ref) => {
  const {
    ChipProps,
    clearIcon,
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disabled = false,
    label,
    forcePopupIcon = 'auto',
    freeSolo = false,
    fullWidth = true,
    getLimitTagsText = (more) => `+${more}`,
    getOptionLabel = (option) => option.label ?? option,
    groupBy,
    id: idProp,
    inputValue: inputValueProp,
    limitTags = -1,
    ListboxComponent = 'ul',
    ListboxProps,
    multiple = false,
    PaperComponent = Paper,
    PopperComponent = Popper,
    popupIcon = <ArrowDropDownIcon />,
    readOnly = false,
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    size = 'large',
    value: valueProp,
    clearText,
    closeText,
    openText,
  } = props


  const {
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions,
  } = useAutocomplete({ ...props, componentName: 'Autocomplete' });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  const ownerState = {
    ...props,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  let startAdornment;
  if (multiple && value.length > 0) {
    const getCustomizedTagProps = (params) => ({
      className: classes.tag,
      disabled,
      ...getTagProps(params),
    });

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps, ownerState);
    } else {
      startAdornment = value.map((option, index) => (
        <Chip
          label={getOptionLabel(option)}
          size={size === 'small' ? 'medium' : size}
          {...getCustomizedTagProps({ index })}
          {...ChipProps}
        />
      ));
    }
  }

  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;
    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push(
        <span className={classes.limitTag} key={startAdornment.length}>
          {getLimitTagsText(more)}
        </span>,
      );
    }
  }

  const defaultRenderGroup = (params) => (
    <li key={params.key}>
      <AutocompleteGroupLabel
        className={classes.groupLabel}
        ownerState={ownerState}
        component="div"
      >
        {params.group}
      </AutocompleteGroupLabel>
      <AutocompleteGroupUl className={classes.groupUl} ownerState={ownerState}>
        {params.children}
      </AutocompleteGroupUl>
    </li>
  );

  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option, { selected }) => {
    return <MenuItem {...props2} multiple={multiple} selected={selected} text={getOptionLabel(option)} />
  };
  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({ option, index });
    return renderOption({ ...optionProps, className: classes.option }, option, {
      selected: optionProps['aria-selected'],
      inputValue,
    });
  };

  return (
    <React.Fragment>
      {renderInput({
        id,
        disabled,
        label,
        size: size === 'small' ? 'small' : undefined,
        ref: setAnchorEl,
        startAdornment,
        className: classes.inputRoot,
        sx: inputRoot,
        inputProps: {
          className: classes.input,
          ...getInputProps(),
        },
        ...((hasClearIcon || hasPopupIcon) && {
          endAdornment: (
            <AutocompleteEndAdornment className={classes.endAdornment}>
              {hasClearIcon ? (
                <AutocompleteClearIndicator
                  {...getClearProps()}
                  aria-label={clearText}
                  title={clearText}
                  className={clsx(
                    classes.clearIndicator,
                  )}
                >
                  {clearIcon}
                </AutocompleteClearIndicator>
              ) : null}
              {hasPopupIcon ? (
                <AutocompletePopupIndicator
                  {...getPopupIndicatorProps()}
                  disabled={disabled}
                  aria-label={popupOpen ? closeText : openText}
                  title={popupOpen ? closeText : openText}
                  ownerState={ownerState}
                  className={clsx(
                    classes.popupIndicator,
                  )}
                >
                  {popupIcon}
                </AutocompletePopupIndicator>
              ) : null}
            </AutocompleteEndAdornment>
          ),
        }),
      })}
      {popupOpen && anchorEl ? (
        <AutocompletePopper
          as={PopperComponent}
          style={{
            width: anchorEl ? anchorEl.clientWidth : null,
          }}
          role="presentation"
          anchorEl={anchorEl}
          open
          className={clsx(classes.popper)}
        >
          <AutocompletePaper
            as={PaperComponent}
            className={clsx(classes.paper)}
          >
            {groupedOptions?.length > 0 ? (
              <AutocompleteListbox
                as={ListboxComponent}
                className={classes.listbox}
                {...getListboxProps()}
                {...ListboxProps}
              >
                {groupedOptions.map((option, index) => {
                  if (groupBy) {
                    return renderGroup({
                      key: option.key,
                      group: option.group,
                      children: option.options.map((option2, index2) =>
                        renderListOption(option2, option.index + index2),
                      ),
                    });
                  }
                  return renderListOption(option, index);
                })}
              </AutocompleteListbox>
            ) : null}
          </AutocompletePaper>
        </AutocompletePopper>
      ) : null}
    </React.Fragment>
  );
});


Autocomplete.defaultProps = {
  clearIcon: <CloseIcon />,
  clearText: 'Clear',
  closeText: 'Close',
  openText: '',
}
export default Autocomplete;
