import java.awt.EventQueue;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

import javax.swing.ImageIcon;
import javax.swing.JPanel;
import javax.swing.Timer;
import javax.swing.JFrame;

@SuppressWarnings("serial")
class SnakeGameMachine extends JPanel implements ActionListener {

	private final int boardWidth = 800;
	private final int boardHeight = 600;
	private final int snakeWidth = 10;
	private final int maxDotsNumber = boardWidth * boardHeight / snakeWidth / snakeWidth; //max number parts of snake
	private int timeDelay = 100;
	private int x[] = new int[maxDotsNumber];	//the snake position for each part
	private int y[] = new int[maxDotsNumber];	// in x[0] & y[0] set position for head
	private int snakeLength=3;					//start length of snake 
	private int appleX;							//position for apple
	private int appleY;
	private boolean GameOver = false;
	private char direction = 'R';				//direction to move snake
	private Timer timer;
	private Image img = new ImageIcon("backgroundImg.jpg").getImage();//background image
	private Image snakePart = new ImageIcon("dot.png").getImage(); //image for snake part
	private Image apple = new ImageIcon("apple.png").getImage();	//image for apple
	private Image snakeHead = new ImageIcon("headRight.png").getImage();	//image for snake head
	private final Font smallfont = new Font("Helvetica", Font.BOLD, 26);  // font of the drawing score
    private int score; // score count
	public SnakeGameMachine() {
		addKeyListener(new CheckKeyPressed());
		setBackground(Color.BLACK);
		setFocusable(true);
		setPreferredSize(new Dimension(boardWidth, boardHeight));
		for (int i = 0; i < snakeLength; i++) {
			x[i] = 400 - i * 10;
			y[i] = 200;
		}
		newApple();
		timer = new Timer((int)timeDelay, this);
		timer.start();
	}

	@Override
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		drawAll(g);
	}

	private void drawAll(Graphics g) {
		score = snakeLength*100-300;
		String s = "Score: " + score;
		backgroundImage(g);
		
		if (!GameOver) {  
			g.setFont(smallfont);
			g.setColor(new Color(96, 128, 255));		   // setting the color
			g.drawString(s, 620, 30);                      //drawing the score
			g.drawImage(apple, appleX, appleY, this);			
			for (int i = 0; i < snakeLength; i++) {
				if (i == 0) {
					g.drawImage(snakeHead, x[i], y[i], this);
				} else {
					g.drawImage(snakePart, x[i], y[i], this);
				}
			}
			Toolkit.getDefaultToolkit().sync();
		} else {
			snakeGameOver(g);
			gameScore(g);
		}
	}
	
	private void backgroundImage(Graphics g){
		g.drawImage(img, 0, 0, boardWidth, boardHeight, this);// background image
	}

	private void snakeGameOver(Graphics g) { //Display Game Over
		String textEndGame = "GAME OVER";
		Font snakeFont = new Font("Arial", Font.BOLD, 40);
		FontMetrics snakeFontMetrics = getFontMetrics(snakeFont);
		g.setColor(Color.magenta);
		g.setFont(snakeFont);
		g.drawString(textEndGame,
				(boardWidth - snakeFontMetrics.stringWidth(textEndGame)) / 2,(boardHeight / 2)-50);
	}
	private void gameScore (Graphics s){ //Game Over display game score
    	String msg = "Your Score is: "+ score;
    	Font font = new Font("Helvetica",Font.BOLD, 40);
    	FontMetrics metr = getFontMetrics(font);
    	s.setColor(Color.yellow);
    	s.setFont(font);
    	s.drawString(msg, (boardWidth - metr.stringWidth(msg)) / 2, boardHeight / 2);
    }

	private void checkEatApple() {
		if ((x[0] == appleX) && (y[0] == appleY)) {
			Sound.play("sounds/bloop.wav");   //plays bloop.wav when eating apples
			snakeLength++;
			newApple();
		}
	}

	private void move() {
		for (int i = snakeLength; i > 0; i--) {
			x[i] = x[(i - 1)];
			y[i] = y[(i - 1)];
		}
		switch (direction) {
		case 'L':
			x[0] -= snakeWidth;
			break;
		case 'R':
			x[0] += snakeWidth;
			break;
		case 'U':
			y[0] -= snakeWidth;
			break;
		case 'D':
			y[0] += snakeWidth;
			break;
		default:
			break;
		}
	}

	private void checkGameOver() {
		for (int i = snakeLength; i > 0; i--) {
			if ((i > 4) && (x[0] == x[i]) && (y[0] == y[i])) {
				GameOver = true;
			}
		}
		if ((y[0] >= boardHeight) || (y[0] < 0) || (x[0] >= boardWidth)	|| (x[0] < 0)) {
			GameOver = true;
		}
		if (GameOver) {
			Sound.play("sounds/game_over.wav");   //plays game_over.wav when GameOver
			timer.stop();
			timeDelay --;
			timer.stop();
			timer = new Timer((int)timeDelay, this); //Speed up the snake
			timer.start();
			newApple();
		}
	}

	private void newApple() {
		int r = (int) (Math.random() * (boardWidth / 10 - 1));
		appleX = ((r * snakeWidth));
		r = (int) (Math.random() * (boardHeight / 10 - 1));
		appleY = ((r * snakeWidth));
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (!GameOver) {
			checkEatApple();
			checkGameOver();
			move();
		}
		repaint();
	}

	private class CheckKeyPressed extends KeyAdapter {
		@Override
		public void keyPressed(KeyEvent e) {
			int key = e.getKeyCode();
			//plays sound click when KeyEvent pressed
			//Add head direction image
			if ((key == KeyEvent.VK_LEFT) && (direction != 'R')) {
				Sound.play("sounds/click.wav");
				snakeHead = new ImageIcon("headLeft.png").getImage();
				direction = 'L';
			}
			if ((key == KeyEvent.VK_RIGHT) && (direction != 'L')) {
				Sound.play("sounds/click.wav");
				snakeHead = new ImageIcon("headRight.png").getImage();
				direction = 'R';
			}
			if ((key == KeyEvent.VK_UP) && (direction != 'D')) {
				Sound.play("sounds/click.wav");
				snakeHead = new ImageIcon("headUp.png").getImage();
				direction = 'U';
			}
			if ((key == KeyEvent.VK_DOWN) && (direction != 'U')) {
				Sound.play("sounds/click.wav");
				snakeHead = new ImageIcon("headDown.png").getImage();
				direction = 'D';
			}
		}
	}
}

@SuppressWarnings("serial")
public class JavaSnake extends JFrame {
	public JavaSnake() {
		add(new SnakeGameMachine());
		setResizable(false);
		pack();
		setTitle("Game Snake - Team DUBAI");
		setLocationRelativeTo(null);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
	}

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			@Override
			public void run() {
				Sound.play("sounds/lets_rock.wav");   // plays lets_rock when game started
				Sound.play("sounds/background.wav");  // playing the background sound 
				JFrame start = new JavaSnake();
				start.setVisible(true);
			}
		});
	}
}