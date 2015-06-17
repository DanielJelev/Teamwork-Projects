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

class SnakeGameMachine extends JPanel implements ActionListener {

	private final int boardWidth = 800;
	private final int boardHeight = 600;
	private final int snakeWidth = 10;
	private final int maxDotsNumber = boardWidth * boardHeight / snakeWidth / snakeWidth; //max number parts of snake
	private final int timeDelay = 140;
	private int x[] = new int[maxDotsNumber];	//the snake position for each part
	private int y[] = new int[maxDotsNumber];	// in x[0] & y[0] set position for head
	private int snakeLength=3;					//start length of snake 
	private int appleX;							//position for apple
	private int appleY;
	private boolean GameOver = false;
	private char direction = 'R';				//direction to move snake
	private Timer timer;
	private Image snakePart = new ImageIcon("part.png").getImage(); //image for snake part
	private Image apple = new ImageIcon("apple.png").getImage();	//image for apple
	private Image snakeHead = new ImageIcon("head.png").getImage();	//image for snake head

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
		timer = new Timer(timeDelay, this);
		timer.start();
	}

	@Override
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		drawAll(g);
	}

	private void drawAll(Graphics g) {
		if (!GameOver) {
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
		}
	}

	private void snakeGameOver(Graphics g) {
		String textEndGame = "GAME OVER";
		Font snakeFont = new Font("Arial", Font.BOLD, 30);
		FontMetrics snakeFontMetrics = getFontMetrics(snakeFont);
		g.setColor(Color.white);
		g.setFont(snakeFont);
		g.drawString(textEndGame,
				(boardWidth - snakeFontMetrics.stringWidth(textEndGame)) / 2,
				boardHeight / 2);
	}

	private void checkEatApple() {
		if ((x[0] == appleX) && (y[0] == appleY)) {
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
			timer.stop();
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
			if ((key == KeyEvent.VK_LEFT) && (direction != 'R')) {
				direction = 'L';
			}
			if ((key == KeyEvent.VK_RIGHT) && (direction != 'L')) {
				direction = 'R';
			}
			if ((key == KeyEvent.VK_UP) && (direction != 'D')) {
				direction = 'U';
			}
			if ((key == KeyEvent.VK_DOWN) && (direction != 'U')) {
				direction = 'D';
			}
		}
	}
}

public class Snake extends JFrame {
	public Snake() {
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
				JFrame start = new Snake();
				start.setVisible(true);
			}
		});
	}
}