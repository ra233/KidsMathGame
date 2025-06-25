import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Level = 'easy' | 'medium' | 'hard';
type Operator = '+' | '-' | '×';

@Component({
  selector: 'app-math-game',
  imports: [FormsModule, CommonModule],
  templateUrl: './math-game.html',
  styleUrls: ['./math-game.scss'],
})
export class MathGameComponent implements OnInit {
  score = 0;
  timeLeft = 60;
  level: Level = 'easy';
  operator: Operator = '+';
  a = 0;
  b = 0;
  answer: number | null = null;
  feedback = '';
  timerId: any;
  ops: Operator[] = ['+', '-', '×'];

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.score = 0;
    this.timeLeft = 60;
    clearInterval(this.timerId);
    this.countdown();
    this.nextQuestion();
    this.feedback = '';
  }

  countdown() {
    this.timerId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timerId);
        this.feedback = '⏱️ Time’s up!';
      }
    }, 1000);
  }

  nextQuestion() {
    const max =
      this.level === 'easy' ? 10 : this.level === 'medium' ? 20 : 50;
    this.operator = this.ops[Math.floor(Math.random() * this.ops.length)];
    this.a = Math.floor(Math.random() * max) + 1;
    this.b = Math.floor(Math.random() * max) + 1;
    this.answer = null;
  }

  checkAnswer() {
    if (this.answer === null) return;
    const correct = this.solve();
    if (this.answer === correct) {
      this.score++;
      this.feedback = '✅ Correct!';
    } else {
      this.score = Math.max(this.score - 1, 0);
      this.feedback = `❌ Wrong! Correct: ${correct}`;
    }

    setTimeout(() => {
      this.feedback = '';
      this.nextQuestion();
    }, 800);
  }

  solve(): number {
    return this.operator === '+'
      ? this.a + this.b
      : this.operator === '-'
      ? this.a - this.b
      : this.a * this.b;
  }
}
