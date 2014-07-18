#include <opencv2/highgui/highgui.hpp>

#include <stdio.h>
#include <iostream>

using namespace cv;
using namespace std;


void frameCapture(int cameraId){
  std::cout << "Starting..." + std::to_string(cameraId) << std::endl;
  VideoCapture cap(cameraId);
  cap.set(CV_CAP_PROP_FRAME_WIDTH,320);
  cap.set(CV_CAP_PROP_FRAME_HEIGHT,240);
  cap.set(CV_CAP_PROP_FPS, 2);
  cap.set(CV_CAP_PROP_FOURCC, CV_FOURCC('M', 'J', 'P', 'G'));
  Mat frame; cap >> frame;

  string fileName = "tmp/cam-capture-" + std::to_string(cameraId) + ".jpg";
  std::cout << fileName << std::endl;
  imwrite(fileName, frame);
}


void queryFrame(int cameraId)
{
  CvCapture* capture = 0;
  Mat frame, image;

  capture = cvCaptureFromCAM(cameraId);

  if(!capture) cout << "No camera detected" << endl;

  if(capture){
    cout << "In capture ..." << endl;
    IplImage* iplImg = cvQueryFrame( capture );
    frame = iplImg;

    string fileName = "tmp/cam-capture-" + std::to_string(cameraId) + ".jpg";
    std::cout << fileName << std::endl;
    imwrite(fileName, frame);
  }
}


int main(int argc, char** argv){
  int cameraId = atoi(argv[1]);
  frameCapture(cameraId);
}
