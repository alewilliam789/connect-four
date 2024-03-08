import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './features/game-board/game-board.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { RulePageComponent } from './pages/rule-page/rule-page.component';
import { GameMenuComponent } from './features/game-menu/game-menu.component';
import { StartMenuComponent } from './features/start-menu/start-menu.component';
import { MenuButtonComponent } from './shared/components/menu-button/menu-button.component';
import { GameButtonComponent } from './shared/components/game-button/game-button.component';
import { CssVariablePipe } from './shared/pipes/css-variable/css-variable.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    HomePageComponent,
    GamePageComponent,
    RulePageComponent,
    GameMenuComponent,
    StartMenuComponent,
    MenuButtonComponent,
    GameButtonComponent,
    CssVariablePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
