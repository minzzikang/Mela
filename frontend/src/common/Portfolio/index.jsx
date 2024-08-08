import { useEffect, useState } from "react";
import defaultimage from "assets/images/default-image.png";
import { getImg, getMusic } from "API/FileAPI";
import Play from "assets/icons/Play.png";
import Pasue from "assets/icons/Pause.png";
import * as p from "./Portfolio.styled";

function Index(props) {
  const [albumImageURL, setAlbumImageURL] = useState("");
  const [musicURL, setMusicURL] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const albumImageInfo = async () => {
      try {
        if (props.albumImage) {
          const response = await getImg(props.albumImage.fileIdx);
          setAlbumImageURL(response.message);
        } else {
          setAlbumImageURL(defaultimage);
        }
        if (props.content) {
          setLyrics(props.content);
        } else {
          setLyrics("등록된 가사가 없습니다.");
        }
        const musicRes = await getMusic(props.file.fileIdx);
        setMusicURL(musicRes.message);
      } catch (err) {
        console.error(err);
      }
    };

    albumImageInfo();
  }, []);

  let audio = new Audio(musicURL);
  const handleMusic = () => {
    setPlaying(!playing);
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const fileAsText = () => {
    if (typeof lyrics === Object) {
      let lyricFile = lyrics;
      let fileReader = new FileReader();
      fileReader.onload = () => {
        console.log(fileReader.result);
        setLyrics(fileReader.result);
      };
      fileReader.readAsText(lyricFile);
    }
  };
  fileAsText();
  return (
    <p.Container>
      <p.PortfolioContainer>
        <p.Album src={albumImageURL} alt="앨범 이미지" />
        {playing ? (
          <>
            <img src={Pasue} alt="pasue" onClick={handleMusic} />
          </>
        ) : (
          <>
            <img src={Play} alt="play" onClick={handleMusic} />
          </>
        )}
        <p.Open onClick={handleVisible}>Lyrics</p.Open>
      </p.PortfolioContainer>
      {visible ? (
        <>
          <p.Lyrics>{lyrics}</p.Lyrics>
        </>
      ) : (
        <></>
      )}
    </p.Container>
  );
}

export default Index;
