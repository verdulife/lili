export interface Link {
	entity: string;
	url: string;
	order: number;
}

export interface ClientEmpty {
	createdAt: Date;
	name: string;
	image: string;
}

export interface ClientWithLinks extends ClientEmpty {
	links: Link[];
}
