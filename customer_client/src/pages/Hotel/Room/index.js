import { useState } from "react";
// UI lib
import {
  Box,
  Container,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
// UI custom
import Filter from "./Filter";
import Result from "./Result";
import List from "./List";
import Loading from "./Loading";
import Viewer from "./Viewer";
import NotEnoughDialog from "./NotEnoughDialog";
import AuthenticatedDialog from "./AuthenticatedDialog";
// logic lib
// logic custom
//#region CSS
const ContentStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down(1144)]: {
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
  },
}));

const RoomListWrapper = styled("div")(({ theme }) => ({
  width: "67%",
  marginRight: 25,
  [theme.breakpoints.down(1144)]: {
    width: "100%",
    marginRight: 0,
  },
}));
//#endregion

//----------------------------

const Room = ({ hotel }) => {
  const [result, setResult] = useState({ loading: false, num: -1 });
  const [sortValue, setSortValue] = useState(1);
  const [openViewer, setOpenViewer] = useState(false);
  const [dataViewer, setDataViewer] = useState({});
  const [openNotEnoughDialog, setOpenNotEnoughDialog] = useState(false);
  const [notEnoughRooms, setNotEnoughRooms] = useState([]);
  const [openAuthenticatedDialog, setOpenAuthenticatedDialog] = useState(false);

  // BOOKING INFO
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000));
  const [visitor, setVisitor] = useState({ adult: 1, kid: 0, baby: 0 });
  const [selectedRooms, setSelectedRooms] = useState([]);
  return (
    <Box
      style={{
        width: "100%",
        paddingTop: 20,
      }}
    >
      <Filter
        hotel_id={hotel._id}
        setResult={setResult}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setVisitor={setVisitor}
        setSelectedRooms={setSelectedRooms}
      />
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        style={{ marginTop: 20, marginBottom: 10 }}
      >
        <Typography variant="body1" style={{ marginRight: 10 }}>
          Sắp xếp theo
        </Typography>
        <TextField
          label=""
          name="filter"
          variant="outlined"
          select
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          <MenuItem value={1}>Gần đây nhất</MenuItem>
          <MenuItem value={2}>Đánh giá, cao đến thấp</MenuItem>
          <MenuItem value={3}>Đánh giá, thấp đến cao</MenuItem>
          <MenuItem value={4}>Hữu ích nhất</MenuItem>
        </TextField>
      </Stack>
      {/* RoomList */}
      <ContentStyle>
        <RoomListWrapper>
          {result.loading ? (
            <>
              <Loading />
              <Loading />
              <Loading />
            </>
          ) : result.num !== -1 ? (
            <>
              {result.num > 0 ? (
                <>
                  <List
                    setOpenViewer={setOpenViewer}
                    setDataViewer={setDataViewer}
                    selectedRooms={selectedRooms}
                    setSelectedRooms={setSelectedRooms}
                  />
                  <Viewer
                    data={dataViewer}
                    open={openViewer}
                    setOpen={setOpenViewer}
                  />
                </>
              ) : (
                <Container
                  maxWidth="lg"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/static/hotel_list/no-result.webp"
                    alt="banner"
                    width="100%"
                    style={{ maxHeight: "50vh", objectFit: "contain" }}
                  />
                  <Typography textAlign="center" variant="h6">
                    Rất tiếc, không có phòng theo lựa chọn của quý khách.
                  </Typography>
                  <Typography textAlign="center" variant="h6">
                    Vui lòng thay đổi thời gian lưu trú hoặc khách sạn cùng khu
                    vực (nếu có).
                  </Typography>
                </Container>
              )}
            </>
          ) : (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/static/hotel_list/not-search.webp"
                alt="banner"
                width="100%"
                style={{ maxHeight: "60vh", objectFit: "contain" }}
              />
              <Typography textAlign="center" variant="h3">
                Tìm kiếm chỗ nghỉ chân ngay nào!!
              </Typography>
            </Box>
          )}
        </RoomListWrapper>
        <Result
          hotelId={hotel._id}
          hotelName={hotel.name}
          startDate={startDate}
          endDate={endDate}
          visitor={visitor}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          setOpenNotEnoughDialog={setOpenNotEnoughDialog}
          setNotEnoughRooms={setNotEnoughRooms}
          setOpenAuthenticatedDialog={setOpenAuthenticatedDialog}
        />
        <NotEnoughDialog
          open={openNotEnoughDialog}
          setOpen={setOpenNotEnoughDialog}
          data={notEnoughRooms}
        />
        <AuthenticatedDialog
          open={openAuthenticatedDialog}
          setOpen={setOpenAuthenticatedDialog}
        />
      </ContentStyle>
    </Box>
  );
};

export default Room;