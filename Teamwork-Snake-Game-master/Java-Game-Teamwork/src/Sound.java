import java.io.File;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;


public class Sound {
	public static synchronized void play(final String fileName) {
		
		/*
		--> because it is a static function, we do not need to create a new Sound object
		    every time
		--> uses only audio files with .wav extensions
		--> to make possible to play more than one sound at a time, we are creating a new
		    threat for every sound 
		--> the sounds are downloaded from  http://www.wavsource.com
		--> sounds are located in folder "sounds" in the project folder
		*/
		
		new Thread(new Runnable() {
			
			public void run() {
				
				try {
				Clip clip = AudioSystem.getClip();
				AudioInputStream input = AudioSystem.getAudioInputStream(new File(fileName));
				clip.open(input);
				clip.start();
				
				// if there is a problem with finding the file --> "play sound error"
			} catch (Exception e) {
				System.out.println("play sound error");
			}
			}
			//after creating the new threat, we are filling out its run() and than starting it start();
		   }).start();
		
			
		}
	}


