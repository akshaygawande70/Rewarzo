import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import tutorialsData from "@/data/tutorials-data"; // Assume this is where your tutorial data is stored
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';
import { PDFViewer } from '../../../widgets/PDFViewer/PDFViewer';
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

const ViewTutorial = () => {
  const { tutorialId } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const playerRef = useRef(null);
  const [file] = useState('/file/example.pdf');

  useEffect(() => {
    // Check if playerRef.current is not null before calling focus
    if (playerRef.current) {
      playerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const parsedTutorialId = parseInt(tutorialId, 10);
    const foundTutorial = tutorialsData.find(tutorial => tutorial.id === parsedTutorialId);
    setTutorial(foundTutorial);
  }, [tutorialId]);

  if (!tutorial) {
    return <div className="text-center text-red-500">Tutorial not found</div>;
  }

  return (
    <div className="-mx-2 mt-12 lg:mx-4">
      {tutorial.media === "video" &&
        <Card className="bg-white rounded-xl shadow-lg overflow-hidden p-4">
          <CardBody className="p-0">
            <MediaPlayer
              title="Sprite Fight"
              src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
              poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
              thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
              aspect-ratio={16 / 8}
              crossorigin=""
              ref={playerRef}
            >
              <MediaOutlet>
                <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
                <track
                  src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
                  label="English"
                  srcLang="en-US"
                  kind="subtitles"
                  default
                />
                <track
                  src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
                  srcLang="en-US"
                  kind="chapters"
                  default
                />
              </MediaOutlet>
              <MediaCommunitySkin />
            </MediaPlayer>
          </CardBody>
        </Card>
      }

      {tutorial.media === "doc" &&
        <Card className="bg-white rounded-xl shadow-lg overflow-hidden p-0">
          <CardBody className="p-0">
            <PDFViewer fileUrl={file} watermark={true} />
          </CardBody>
        </Card>
      }
    </div>
  );
};

export default ViewTutorial;
