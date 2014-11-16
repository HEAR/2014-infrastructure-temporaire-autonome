import java.awt.Toolkit;

int duree = 10;
int compteurSecond = 0;
int oldSecond = 0;


void setup() {
  
  size(400,400);
  duree = 10 * 60;
  duree = 5;
  
  
}

void draw() {
  
  background(123);
  
  if(second() - oldSecond > 0){
      oldSecond = second();
      compteurSecond ++ ;
  }
  
  if(compteurSecond >= duree){
    background(255,0,0);
    Toolkit.getDefaultToolkit().beep();

  }
  
  println(compteurSecond);
  
}

