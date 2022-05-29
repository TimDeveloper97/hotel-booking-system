import { useState, useEffect } from "react";
// UI
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// Logic

export default function FilterAutocomplete({
  name,
  text,
  value,
  setValue,
  getData,
  parentId,
  getOptionLabel,
  noOptionsText,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    getData(parentId)
      .then((res) => {
        if (active) {
          setOptions([...res.data]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.log(err);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [loading, getData, parentId]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
      setLoading(false);
    } else setLoading(true);
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      name={name}
      fullWidth
      noOptionsText={noOptionsText}
      loadingText="Đang tải..."
      options={options}
      loading={loading}
      open={open}
      value={value}
      isOptionEqualToValue={(option, value) =>
        value._id === "" || option._id === value._id
      }
      getOptionLabel={(option) => getOptionLabel(option)}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, value) => {
        setValue(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          label={text}
          placeholder={text}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
