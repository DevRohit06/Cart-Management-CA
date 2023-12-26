export class UserType {
	constructor(
		public id: string,
		public email: string,
		public photoURL: string,
		public displayName: string,
		public cartItem?: []
	) {}

    changeId(id: string){
        this.id = id
    }

    updatePhotoURL(image: string){
        this.photoURL = image
    }
}
