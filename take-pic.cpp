#include <opencv2/highgui/highgui.hpp>

#include <stdio.h>
#include <iostream>
using namespace cv;


int main(int argc, char** argv){

  int cameraId = atoi(argv[1]);

  VideoCapture cap(cameraId);
  cap.set(CV_CAP_PROP_FRAME_WIDTH,320);
  cap.set(CV_CAP_PROP_FRAME_HEIGHT,240);
  Mat frame; cap >> frame;

  string fileName = "tmp/cam-capture-" + std::to_string(cameraId) + ".jpg";
  std::cout << fileName << std::endl;
  imwrite(fileName, frame);
}
