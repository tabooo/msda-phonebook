package phonebook.util;

import java.io.Serializable;
import java.util.Collection;

public final class Transaction<T, C> implements Serializable {

	private static final long serialVersionUID = 1L;

	// Whether transaction was successful
	private final boolean valid;

	// Manipulated object
	private final T added;

	// Manipulated set
	private final Collection<C> addeds;

	// Exception during transaction
	private final Exception exception;

	// description text -when invalid we store error message when success
	// whatever we want
	private final String description;

	public boolean isValid() {
		return this.valid;
	}

	public boolean invalid() {
		return ObjectUtils.notTrue(valid);
	}

	public T getAdded() {
		return added;
	}

	public Collection<C> getAddeds() {
		return addeds;
	}

	public Exception getException() {
		return exception;
	}

	public String getDescription() {
		return description;
	}

	/**
	 * Creates and returns descriptor which is optimized with DWR use
	 * 
	 * @return
	 */
//	public Descriptor getDescriptor() {
//		Descriptor descriptor = new Descriptor();
//		descriptor.setAdded(this.added);
//		descriptor.setValid(this.valid);
//		descriptor.setDescription(this.description);
//		return descriptor;
//	}

	// Hidden constructor which is used only by builder class
	private Transaction(Builder<T, C> builder) {

		this.valid = builder.valid;

		this.added = builder.added;

		if (builder.addeds == null) {
			// this.addeds = new HashSet();
			this.addeds = null;
		} else {
			this.addeds = builder.addeds;
		}

		this.exception = builder.exception;

		if (builder.exception != null && builder.description == null) {
			this.description = builder.exception.getMessage();
		} else {
			this.description = builder.description;
		}

	}

	public static <T, C> Builder<T, C> getValidBuilder() {

		return new Transaction.Builder<T, C>(Boolean.TRUE);
	}

	public static <T, C> Builder<T, C> getValidBuilder(T added) {

		Builder<T, C> builder = getValidBuilder();
		builder.added(added);

		return builder;
	}

	public static <T, C> Builder<T, C> getValidBuilder(Collection<C> addeds) {

		Builder<T, C> builder = getValidBuilder();
		builder.addeds(addeds);

		return builder;
	}

	public static <T, C> Builder<T, C> getValidBuilder(T added,
			Collection<C> addeds) {

		Builder<T, C> builder = getValidBuilder(added);
		builder.addeds(addeds);

		return builder;
	}

	public static <T, C> Builder<T, C> getInvalidBuilder() {

		return new Transaction.Builder<T, C>(Boolean.FALSE);
	}

	public static <T, C> Builder<T, C> getInvalidBuilder(String description) {

		Builder<T, C> builder = getInvalidBuilder();
		builder.description(description);

		return builder;
	}

	public static <T, C> Builder<T, C> getInvalidBuilder(Exception ex,
			String description) {

		Builder<T, C> builder = getInvalidBuilder();
		builder.description(description);
		builder.exception(ex);

		return builder;
	}

	public static <T, C> Builder<T, C> getInvalidBuilder(Exception ex) {

		return getInvalidBuilder(ex, ex.getMessage());
	}

	public static <T, C> Transaction<T, C> invalidTransaction() {

		Builder<T, C> builder = getInvalidBuilder();

		return builder.build();
	}

	public static <T, C> Transaction<T, C> invalidTransaction(String description) {

		Builder<T, C> builder = getInvalidBuilder(description);

		return builder.build();
	}

	public static <T, C> Transaction<T, C> invalidTransaction(Exception ex,
			String description) {

		Builder<T, C> builder = getInvalidBuilder(ex, description);

		return builder.build();
	}

	public static <T, C> Transaction<T, C> invalidTransaction(Exception ex) {

		Builder<T, C> builder = getInvalidBuilder(ex);

		return builder.build();
	}

	public static <T, C> Transaction<T, C> invalidTransaction(
			Transaction<?, ?> sourceTranbsaction) {

		Builder<T, C> builder = getInvalidBuilder(
				sourceTranbsaction.getException(),
				sourceTranbsaction.getDescription());

		return builder.build();
	}

	public static <T, C> Transaction<T, C> validTransaction() {

		Builder<T, C> builder = getValidBuilder();

		return builder.build();
	}

	public static <T, C> Transaction<T, C> validTransaction(T added) {

		Builder<T, C> builder = getValidBuilder(added);

		return builder.build();
	}

	public static <T, C> Transaction<T, C> validTransaction(Collection<C> addeds) {

		Builder<T, C> builder = getValidBuilder(addeds);

		return builder.build();
	}

	public static <T, C> Transaction<T, C> validTransaction(T added,
			Collection<C> addeds) {

		Builder<T, C> builder = getValidBuilder(added, addeds);

		return builder.build();
	}

	/**
	 * Builder class for transaction descriptor
	 * 
	 * @author soso
	 * 
	 */
	public static class Builder<T, C> {

		private final boolean valid;

		private T added;

		private Collection<C> addeds;

		private Exception exception;

		private String description;

		public Builder(boolean valid) {
			this.valid = valid;
		}

		public Builder<T, C> added(T val) {
			added = val;
			return this;
		}

		public Builder<T, C> addeds(Collection<C> val) {
			addeds = val;
			return this;
		}

		public Builder<T, C> exception(Exception val) {
			exception = val;
			return this;
		}

		public Builder<T, C> description(String val) {
			description = val;
			return this;
		}

		public Transaction<T, C> build() {
			return new Transaction<T, C>(this);
		}
	}
}