import React, { useState, useEffect, useMemo } from "react";
import throttle from "lodash/throttle";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TextField, Grid, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Search } from "@material-ui/icons";

import { addressAutoComplete } from "utility/addressHandler";
import { useHistory } from "react-router";

const useStyle = makeStyles(() => ({
  iconButton: {
    padding: 5,
  },
}));

export default function AddressInputBox() {
  const classes = useStyle();
  const history = useHistory();

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        addressAutoComplete(request.input, 0, callback);
      }, 200),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <>
      <Autocomplete
        id="google-map-demo"
        style={{ width: 700, margin: 0 }}
        getOptionLabel={(option) => option.auto_complete}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        freeSolo
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="????????? ???????????????"
            size="small"
            variant="outlined"
            // InputProps={{ type: "search" }}
            fullWidth
          />
        )}
        renderOption={(option) => {
          return (
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="body1" color="textPrimary">
                  {option.auto_complete}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />

      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => {
          console.log(value);
          debugger;

          const geocoder = new window.daum.maps.services.Geocoder();
          // ?????? -> ?????? ??????
          geocoder.addressSearch(value.auto_complete, (result, status) => {
            // ?????? ?????? ?????? ??? ????????? ??????.
            if (status === window.daum.maps.services.Status.OK) {
              // url??? ?????? ????????? ??????????????? ??????
              let newSearch = new URLSearchParams(history.location.search);
              newSearch.set("longitude", result[0].x);
              newSearch.set("latitude", result[0].y);
              history.replace({
                search: "?" + newSearch.toString(),
              });
            } else {
              console.error("invalid address");
            }
          });
        }}
      >
        <Search />
      </IconButton>
    </>
  );
}
