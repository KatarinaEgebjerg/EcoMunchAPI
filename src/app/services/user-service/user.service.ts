import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
} from '@angular/fire/firestore';
import { MealService } from '../meal-service/meal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private mealService: MealService) { 
  }

async getUserData(uid: string) {
  const db = getFirestore();
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    this.currentUser.next(userData);
    return userData;
  } else {
    console.log('No such document!');
    return null;
  }
}

async addToFavorites(userId: string, mealId: string) {
  try {
    const db = getFirestore();
    await setDoc(doc(db, 'users', userId, 'favorites', mealId), { mealId });
  } catch (error) {
    console.log('Error during addToFavorites: ', error);
    throw new Error('Failed to add meal to favorites. Please try again.');
  }
}

async getFavorites(userId: string) {
  try {
    const db = getFirestore();
    const querySnapshot = await getDocs(
      collection(db, 'users', userId, 'favorites')
    );
    const favorites = [];
    for (const doc of querySnapshot.docs) {
      const mealId = doc.data()['mealId'];
      const meal = await this.mealService.getMealById(mealId);
      favorites.push(meal);
    }
    return favorites;
  } catch (error) {
    console.log('Error during getFavorites: ', error);
    throw new Error('Failed to fetch favorites. Please try again.');
  }
}
}